import { buildCallGraph } from "./callgraph";
import { CallGraph } from "./graph";

let failures = 0;

// Generic check: compare via JSON. Caller decides whether to pre-sort.
function check(label: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    console.log(`ok   ${label}`);
  } else {
    failures++;
    console.log(`FAIL ${label}`);
    console.log(`       expected: ${e}`);
    console.log(`       actual:   ${a}`);
  }
}

// Sort a list so set-style answers compare regardless of order.
const sorted = (xs: string[]) => [...xs].sort();

const edges = buildCallGraph("sample/**/*.ts");
const graph = new CallGraph(edges);

// 1. Edges (Stage 2) — hand-traced source of truth.
const expectedEdges = [
  "double -> add",
  "Calculator.square -> double",
  "Calculator.cube -> Calculator.square",
  "run -> Calculator.square",
  "perimeter -> double",
  "total -> add",
  "Animal.report -> Animal.speak",
  "demo -> Dog.speak",
  "demo -> Animal.speak",
  "mystery -> Animal.speak",
].sort();
const actualEdges = edges.map((e) => `${e.from} -> ${e.to}`).sort();
check("edges", actualEdges, expectedEdges);

// 2. Direct queries (sets → sort both sides).
check("whoCalls(double)", sorted(graph.whoCalls("double")),
  sorted(["Calculator.square", "perimeter"]));
check("whatItCalls(run)", sorted(graph.whatItCalls("run")),
  sorted(["Calculator.square"]));

// 3. Transitive closure (sets → sort both sides).
check("whatReaches(add)", sorted(graph.whatReaches("add")),
  sorted(["double", "total", "Calculator.square", "perimeter", "Calculator.cube", "run"]));
check("reachableFrom(run)", sorted(graph.reachableFrom("run")),
  sorted(["Calculator.square", "double", "add"]));

// 4. Path tracing (sequence → exact, no sort).
check("tracePath(run, add)", graph.tracePath("run", "add"),
  ["run", "Calculator.square", "double", "add"]);
check("tracePath(add, run)", graph.tracePath("add", "run"), null);

// Summary.
if (failures === 0) {
  console.log(`\nPASS — all checks passed.`);
} else {
  console.log(`\nFAIL — ${failures} check(s) failed.`);
  process.exit(1);
}