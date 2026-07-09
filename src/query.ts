import { buildCallGraph } from "./callgraph";
import { CallGraph } from "./graph";

const graph = new CallGraph(buildCallGraph("sample/**/*.ts"));

const p1 = graph.tracePath("run", "add");
console.log("How does run reach add?", p1 ? p1.join(" -> ") : "no path");

const p2 = graph.tracePath("add", "run");
console.log("How does add reach run?", p2 ? p2.join(" -> ") : "no path");