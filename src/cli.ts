import { writeFileSync, mkdirSync } from "fs";
import { buildCallGraph, buildCallGraphFromTsConfig, Edge } from "./callgraph";
import { CallGraph } from "./graph";

// ── Argument parsing ─────────────────────────────────────────────────────────
// Usage:
//   cli <command> [args...] [--project <tsconfig.json>]
// Without --project, the bundled sample/ fixture is analyzed.

const USAGE = `Cartograph — a type-resolved call-graph analyzer for TypeScript.

Usage:
  npx tsx src/cli.ts <command> [args] [--project <tsconfig.json>]

Commands:
  edges                     List every call-graph edge (caller -> callee).
  stats                     Summary: node/edge counts, most-called, entry points.
  who-calls   <node>        Direct callers of <node>.
  what-breaks <node>        Everything that transitively depends on <node>.
  depends-on  <node>        Everything <node> transitively calls.
  path        <from> <to>   A call path from <from> to <to>, if one exists.
  viz                       Write viz/data.js for the interactive visualization.

Target:
  Default              Analyzes the bundled sample/ fixture.
  --project <tsconfig> Analyzes a real TypeScript project through its tsconfig
                       (resolves path aliases like @/*).

Node names:
  Nodes are "<file>:<name>" (e.g. app/page.tsx:Home). You may pass just the
  name (e.g. "Home") or any unique suffix; the CLI resolves it, or lists the
  candidates if ambiguous.

Examples:
  npx tsx src/cli.ts what-breaks add
  npx tsx src/cli.ts who-calls detectColumns --project ../insightforge/tsconfig.cartograph.json
  npx tsx src/cli.ts path run add
`;

function parseArgs(argv: string[]): { command: string; rest: string[]; project?: string } {
  const rest: string[] = [];
  let project: string | undefined;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--project" || argv[i] === "-p") {
      project = argv[++i];
    } else {
      rest.push(argv[i]);
    }
  }
  const [command = "", ...args] = rest;
  return { command, rest: args, project };
}

function loadEdges(project?: string): { edges: Edge[]; label: string } {
  if (project) {
    return { edges: buildCallGraphFromTsConfig(project), label: project };
  }
  return { edges: buildCallGraph("sample/**/*.ts"), label: "sample/" };
}

// ── Node-name resolution ─────────────────────────────────────────────────────
// Let the user type a short name; resolve it to a full "file:name" id.
function resolveNode(graph: CallGraph, query: string): string {
  const all = graph.nodes();
  if (all.includes(query)) return query;

  const nameOf = (id: string) => id.slice(id.lastIndexOf(":") + 1);

  // Prefer an exact match on the name part.
  const exact = all.filter((id) => nameOf(id) === query);
  if (exact.length === 1) return exact[0];

  // Otherwise any id that ends with the query (e.g. "math.ts:add").
  const suffix = all.filter((id) => id.endsWith(query));
  const candidates = exact.length ? exact : suffix.length ? suffix : all.filter((id) => id.includes(query));

  if (candidates.length === 1) return candidates[0];
  if (candidates.length === 0) {
    fail(`No node matches "${query}". Try "edges" or "stats" to see available nodes.`);
  }
  fail(
    `"${query}" is ambiguous — ${candidates.length} matches:\n` +
      candidates.map((c) => `  ${c}`).join("\n") +
      `\nPass a longer, unique name.`
  );
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function printList(title: string, items: string[]): void {
  console.log(title);
  if (items.length === 0) {
    console.log("  (none)");
    return;
  }
  for (const item of [...items].sort()) console.log(`  ${item}`);
}

// ── Commands ─────────────────────────────────────────────────────────────────

function main(): void {
  const { command, rest, project } = parseArgs(process.argv.slice(2));

  if (!command || command === "help" || command === "--help" || command === "-h") {
    console.log(USAGE);
    return;
  }

  const { edges, label } = loadEdges(project);
  const graph = new CallGraph(edges);

  switch (command) {
    case "edges": {
      console.log(`${edges.length} edges in ${label}\n`);
      for (const e of [...edges].sort((a, b) => `${a.from}${a.to}`.localeCompare(`${b.from}${b.to}`))) {
        console.log(`${e.from}  ->  ${e.to}`);
      }
      break;
    }

    case "stats": {
      const nodes = graph.nodes();
      const byCallers = nodes
        .map((n) => ({ n, count: graph.whoCalls(n).length }))
        .filter((x) => x.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      const entryPoints = nodes.filter((n) => graph.whoCalls(n).length === 0);
      const leaves = nodes.filter((n) => graph.whatItCalls(n).length === 0);

      console.log(`Call graph for ${label}`);
      console.log(`  nodes: ${nodes.length}`);
      console.log(`  edges: ${edges.length}`);
      console.log(`\nMost-called functions (fan-in):`);
      for (const { n, count } of byCallers) console.log(`  ${count}  ${n}`);
      console.log(`\nEntry points (called by nothing in graph): ${entryPoints.length}`);
      for (const n of entryPoints.slice(0, 10).sort()) console.log(`  ${n}`);
      if (entryPoints.length > 10) console.log(`  … and ${entryPoints.length - 10} more`);
      console.log(`\nLeaves (call nothing in graph): ${leaves.length}`);
      break;
    }

    case "who-calls": {
      if (!rest[0]) fail(`Usage: who-calls <node>`);
      const node = resolveNode(graph, rest[0]);
      printList(`Direct callers of ${node}:`, graph.whoCalls(node));
      break;
    }

    case "what-breaks": {
      if (!rest[0]) fail(`Usage: what-breaks <node>`);
      const node = resolveNode(graph, rest[0]);
      printList(`Functions that transitively depend on ${node} (would be affected by a change):`, graph.whatReaches(node));
      break;
    }

    case "depends-on": {
      if (!rest[0]) fail(`Usage: depends-on <node>`);
      const node = resolveNode(graph, rest[0]);
      printList(`Everything ${node} transitively calls:`, graph.reachableFrom(node));
      break;
    }

    case "path": {
      if (!rest[0] || !rest[1]) fail(`Usage: path <from> <to>`);
      const from = resolveNode(graph, rest[0]);
      const to = resolveNode(graph, rest[1]);
      const p = graph.tracePath(from, to);
      if (p) {
        console.log(p.join("\n  -> "));
      } else {
        console.log(`No call path from ${from} to ${to}.`);
      }
      break;
    }

    case "viz": {
      const data = {
        nodes: graph.nodes().map((id) => ({ id, label: id })),
        edges: graph.edges().map((e) => ({ from: e.from, to: e.to })),
      };
      mkdirSync("viz", { recursive: true });
      writeFileSync("viz/data.js", `window.GRAPH = ${JSON.stringify(data, null, 2)};`);
      console.log(`Wrote viz/data.js — ${data.nodes.length} nodes, ${data.edges.length} edges from ${label}.`);
      console.log(`Open viz/index.html in a browser to explore.`);
      break;
    }

    default:
      fail(`Unknown command "${command}".\n\n${USAGE}`);
  }
}

main();
