import { Project, SyntaxKind, Node, CallExpression } from "ts-morph";

export interface Edge {
  from: string;
  to: string;
}

function getEnclosingCallable(node: Node): Node | undefined {
  return node.getFirstAncestor(
    (a) => Node.isFunctionDeclaration(a) || Node.isMethodDeclaration(a)
  );
}

function describe(node: Node): string {
  if (Node.isMethodDeclaration(node)) {
    const cls = node.getFirstAncestorByKind(SyntaxKind.ClassDeclaration);
    return `${cls?.getName()}.${node.getName()}`;
  }
  if (Node.isFunctionDeclaration(node)) {
    return node.getName() ?? "<anonymous>";
  }
  return node.getKindName();
}

// Resolves a call's callee to its symbol, against the receiver's *static* type.
// Runtime dynamic dispatch is undecidable in general and intentionally not tracked.
function resolveCalleeSymbol(call: CallExpression) {
  const callee = call.getExpression();
  let symbol;
  if (Node.isPropertyAccessExpression(callee)) {
    symbol = callee.getNameNode().getSymbol();
  } else {
    symbol = callee.getSymbol();
  }
  if (!symbol) return undefined;
  const aliased = symbol.getAliasedSymbol();
  return aliased ?? symbol;
}

export function buildCallGraph(globs: string): Edge[] {
  const project = new Project();
  project.addSourceFilesAtPaths(globs);

  const edges: Edge[] = [];
  for (const file of project.getSourceFiles()) {
    for (const call of file.getDescendantsOfKind(SyntaxKind.CallExpression)) {
      const caller = getEnclosingCallable(call);
      if (!caller) continue;
      const symbol = resolveCalleeSymbol(call);
      if (!symbol) continue;
      for (const decl of symbol.getDeclarations()) {
        edges.push({ from: describe(caller), to: describe(decl) });
      }
    }
  }
  return edges;
}