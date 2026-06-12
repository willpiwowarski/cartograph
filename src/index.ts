import { Project } from "ts-morph";

// 1. A "Project" is ts-morph's in-memory model of a whole codebase.
const project = new Project();

// 2. Load the files we want to analyze into that model.
project.addSourceFilesAtPaths("sample/**/*.ts");

// 3. Walk every file and collect every callable (functions + class methods).
for (const file of project.getSourceFiles()) {
  // Top-level functions, e.g. `function add() {}`
  for (const fn of file.getFunctions()) {
    console.log(`function  ${fn.getName()}  (${file.getBaseName()}:${fn.getStartLineNumber()})`);
  }

  // Methods inside classes, e.g. `square() {}`
  for (const cls of file.getClasses()) {
    for (const method of cls.getMethods()) {
      console.log(`method    ${cls.getName()}.${method.getName()}  (${file.getBaseName()}:${method.getStartLineNumber()})`);
    }
  }
}