import { buildCallGraph } from "./callgraph";
import { CallGraph } from "./graph";

const graph = new CallGraph(buildCallGraph("sample/**/*.ts"));

console.log("Who calls double?          ", graph.whoCalls("sample/math.ts:double"));
console.log("What breaks if I change add?", graph.whatReaches("sample/math.ts:add"));

const p = graph.tracePath("sample/math.ts:run", "sample/math.ts:add");
console.log("How does run reach add?    ", p ? p.join(" -> ") : "no path");