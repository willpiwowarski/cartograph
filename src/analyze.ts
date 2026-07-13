import { buildCallGraphFromTsConfig } from "./callgraph";

const tsConfigPath = process.argv[2];
if (!tsConfigPath) {
  console.error("Usage: npx tsx src/analyze.ts <path-to-tsconfig.json>");
  process.exit(1);
}

const edges = buildCallGraphFromTsConfig(tsConfigPath);
console.log(`Total edges: ${edges.length}\n`);
for (const e of edges) {
  console.log(`${e.from}  ->  ${e.to}`);
}