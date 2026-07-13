import { buildCallGraph } from "./callgraph";
import { CallGraph } from "./graph";

let failures = 0;

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

const sorted = (xs: string[]) => [...xs].sort();

const edges = buildCallGraph("sample/**/*.ts");
const graph = new CallGraph(edges);

// 1. Edges — now file-qualified.
const expectedEdges = [
  "sample/math.ts:double -> sample/math.ts:add",
  "sample/math.ts:Calculator.square -> sample/math.ts:double",
  "sample/math.ts:Calculator.cube -> sample/math.ts:Calculator.square",
  "sample/math.ts:run -> sample/math.ts:Calculator.square",
  "sample/geometry.ts:perimeter -> sample/math.ts:double",
  "sample/geometry.ts:total -> sample/math.ts:add",
  "sample/animals.ts:Animal.report -> sample/animals.ts:Animal.speak",
  "sample/animals.ts:demo -> sample/animals.ts:Dog.speak",
  "sample/animals.ts:demo -> sample/animals.ts:Animal.speak",
  "sample/animals.ts:mystery -> sample/animals.ts:Animal.speak",
  // Arrow / function-expression callables (handlers.ts):
  "sample/handlers.ts:accumulate -> sample/math.ts:add",       // arrow → imported fn decl
  "sample/handlers.ts:summarize -> sample/handlers.ts:accumulate", // arrow → arrow
  "sample/handlers.ts:report -> sample/handlers.ts:summarize",     // arrow → arrow
  "sample/handlers.ts:report -> sample/handlers.ts:format",        // arrow → function-expression
].sort();
const actualEdges = edges.map((e) => `${e.from} -> ${e.to}`).sort();
check("edges", actualEdges, expectedEdges);

// 2. Direct queries.
check("whoCalls(double)", sorted(graph.whoCalls("sample/math.ts:double")),
  sorted(["sample/math.ts:Calculator.square", "sample/geometry.ts:perimeter"]));
check("whatItCalls(run)", sorted(graph.whatItCalls("sample/math.ts:run")),
  sorted(["sample/math.ts:Calculator.square"]));

// 3. Transitive closure. `add` is now also reached through the arrow chain
//    report -> summarize -> accumulate -> add.
check("whatReaches(add)", sorted(graph.whatReaches("sample/math.ts:add")),
  sorted([
    "sample/math.ts:double",
    "sample/geometry.ts:total",
    "sample/math.ts:Calculator.square",
    "sample/geometry.ts:perimeter",
    "sample/math.ts:Calculator.cube",
    "sample/math.ts:run",
    "sample/handlers.ts:accumulate",
    "sample/handlers.ts:summarize",
    "sample/handlers.ts:report",
  ]));
check("reachableFrom(run)", sorted(graph.reachableFrom("sample/math.ts:run")),
  sorted(["sample/math.ts:Calculator.square", "sample/math.ts:double", "sample/math.ts:add"]));

// 3b. Arrow / function-expression callables resolve as both caller and callee.
check("whoCalls(accumulate)", sorted(graph.whoCalls("sample/handlers.ts:accumulate")),
  sorted(["sample/handlers.ts:summarize"]));
check("whatItCalls(report)", sorted(graph.whatItCalls("sample/handlers.ts:report")),
  sorted(["sample/handlers.ts:summarize", "sample/handlers.ts:format"]));
// Anonymous callback stays transparent: the call to `add` inside accumulate's
// `.forEach(x => …)` is attributed to accumulate, so this path exists.
check("tracePath(report, add)",
  graph.tracePath("sample/handlers.ts:report", "sample/math.ts:add"),
  ["sample/handlers.ts:report", "sample/handlers.ts:summarize",
   "sample/handlers.ts:accumulate", "sample/math.ts:add"]);

// 4. Path tracing (order matters).
check("tracePath(run, add)",
  graph.tracePath("sample/math.ts:run", "sample/math.ts:add"),
  ["sample/math.ts:run", "sample/math.ts:Calculator.square", "sample/math.ts:double", "sample/math.ts:add"]);
check("tracePath(add, run)",
  graph.tracePath("sample/math.ts:add", "sample/math.ts:run"), null);

if (failures === 0) {
  console.log(`\nPASS — all checks passed.`);
} else {
  console.log(`\nFAIL — ${failures} check(s) failed.`);
  process.exit(1);
}