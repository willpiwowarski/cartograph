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

  // Method call: `receiver.method(...)` — callee is a property access.
  if (Node.isPropertyAccessExpression(callee)) {
    // We want the `.method` name. Which method it is depends on the
    // receiver's type, which the checker has already worked out.
    return callee.getNameNode().getSymbol();
  }

  // Plain call: `fn(...)` — callee is just an identifier.
  return callee.getSymbol();
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