import { writeFileSync, mkdirSync } from "fs";
import { buildCallGraph } from "./callgraph";
import { CallGraph } from "./graph";

const graph = new CallGraph(buildCallGraph("sample/**/*.ts"));

const data = {
  nodes: graph.nodes().map((id) => ({ id, label: id })),
  edges: graph.edges().map((e) => ({ from: e.from, to: e.to })),
};

mkdirSync("viz", { recursive: true });
writeFileSync("viz/data.js", `window.GRAPH = ${JSON.stringify(data, null, 2)};`);
console.log(`Wrote viz/data.js — ${data.nodes.length} nodes, ${data.edges.length} edges.`);