# Cartograph

**A static-analysis tool that builds a type-resolved call graph of a TypeScript codebase — so you can ask structural questions about code instead of reading all of it.**

![Cartograph call graph](docs/screenshot.png)

## What it does

Cartograph parses a TypeScript project into its real syntax tree, resolves every function and method call to the exact definition it refers to, and builds a directed **call graph** (who-calls-whom). On top of that graph you can ask:

- **Who calls this?** — every direct caller of a function.
- **What breaks if I change this?** — every function that transitively depends on it (reverse transitive closure).
- **What does this depend on?** — everything a function transitively calls.
- **How does X reach Y?** — the actual call path between two functions.

The graph is also rendered as an interactive, click-to-explore visualization (pictured above).

## Why it's not just grep

The naive way to answer "what calls `save`?" is to text-search for `save(`. That falls apart immediately: there may be twenty methods named `save`, the call may be renamed through an import (`import { save as persist }`), or it may be a method whose target depends on the receiver's type. Text matching cannot tell these apart.

Cartograph resolves calls through the **TypeScript type checker**, not text. Every edge in the graph is the result of real symbol resolution:

- **Methods** — `user.save()` resolves using the static type of `user`, so the correct `save` is found among many.
- **Imports & aliases** — a call written `sum(a, b)` correctly resolves to the imported `add` it was renamed from.
- **Inheritance & overrides** — a call on a subclass resolves to the override when present, or the inherited base method when not.

That is the difference between a fancy file viewer and a tool that actually understands the code's structure.

## Example

```
$ npx tsx src/query.ts

What breaks if I change add?   [ 'double', 'total', 'Calculator.square', 'perimeter', 'Calculator.cube', 'run' ]
What does run depend on?       [ 'Calculator.square', 'double', 'add' ]
How does run reach add?        run -> Calculator.square -> double -> add
```

## How it works

1. **Parse** — [ts-morph](https://ts-morph.com), a wrapper over the TypeScript compiler, loads the project and exposes both the AST and the type checker.
2. **Resolve** — for every call expression, the callee is resolved to its declaration via the type checker (`getSymbol` → `getAliasedSymbol` → `getDeclarations`), handling methods, imports, aliases, and inheritance.
3. **Build** — resolved caller → callee edges are stored in a bidirectional adjacency structure (a forward *callees* map and a reverse *callers* map), so queries run in either direction.
4. **Query** — direct lookups are O(1); transitive-impact and path queries are breadth-first search over the graph.
5. **Visualize** — the graph is exported and rendered with vis-network as an interactive force-directed diagram; clicking a node highlights its callers and callees.

## Limitations (by design)

Cartograph resolves calls against **static** type information. Runtime **dynamic dispatch** — for example an `Animal`-typed variable that actually holds a `Dog` at runtime — is undecidable in general and intentionally not tracked; such calls resolve to the statically known method. This is a deliberate, documented boundary that every serious static-analysis tool draws.

## Getting started

```bash
npm install
npx tsx src/index.ts      # print all call-graph edges
npx tsx src/query.ts      # run example structural queries
npx tsx src/verify.ts     # run the test suite
npx tsx src/visualize.ts  # regenerate viz/data.js, then open viz/index.html
```

The analyzer accepts any TypeScript source glob; it ships pointed at the `sample/` fixture used by the test suite.

## Status & roadmap

Core analysis, queries, and visualization are complete and verified by an automated test suite. Planned next:

- Point at real repositories via `tsconfig.json` resolution.
- Stable node IDs (`file:name`) to disambiguate same-named functions across files.
- An optional natural-language query layer that translates a question into a graph operation — the graph stays the source of truth, so no code structure is ever hallucinated.
