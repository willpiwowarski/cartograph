import { buildCallGraph } from "./callgraph";

const edges = buildCallGraph("sample/**/*.ts");
for (const e of edges) {
  console.log(`${e.from}  ->  ${e.to}`);
}