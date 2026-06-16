import { Project, SyntaxKind, Node, CallExpression } from "ts-morph";

const project = new Project();
project.addSourceFilesAtPaths("sample/**/*.ts");

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

// Resolve the callee of a call to the symbol it refers to.
function resolveCalleeSymbol(call: CallExpression) {
  const callee = call.getExpression();

  let symbol;
  if (Node.isPropertyAccessExpression(callee)) {
    symbol = callee.getNameNode().getSymbol();
  } else {
    symbol = callee.getSymbol();
  }
  if (!symbol) return undefined;

  // If this name is an imported alias, follow it to the real declaration.
  const aliased = symbol.getAliasedSymbol();
  return aliased ?? symbol;
}

for (const file of project.getSourceFiles()) {
  for (const call of file.getDescendantsOfKind(SyntaxKind.CallExpression)) {
    const caller = getEnclosingCallable(call);
    if (!caller) continue;

    const symbol = resolveCalleeSymbol(call);
    if (!symbol) continue;

    for (const decl of symbol.getDeclarations()) {
      console.log(`${describe(caller)}  ->  ${describe(decl)}`);
    }
  }
}