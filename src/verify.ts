import { buildCallGraph } from "./callgraph";

// Hand-traced by reading the sample by eye. This is the source of truth.
const expected = [
  "double -> add",
  "Calculator.square -> double",
  "Calculator.cube -> Calculator.square",
  "run -> Calculator.square",
  "perimeter -> double",
  "total -> add",
  "Animal.report -> Animal.speak",
  "demo -> Dog.speak",
  "demo -> Animal.speak",
  "mystery -> Animal.speak",
].sort();

const actual = buildCallGraph("sample/**/*.ts")
  .map((e) => `${e.from} -> ${e.to}`)
  .sort();

const missing = expected.filter((e) => !actual.includes(e));
const unexpected = actual.filter((e) => !expected.includes(e));

if (missing.length === 0 && unexpected.length === 0) {
  console.log(`PASS — all ${expected.length} edges matched.`);
} else {
  console.log("FAIL");
  if (missing.length) console.log("  Missing:", missing);
  if (unexpected.length) console.log("  Unexpected:", unexpected);
  process.exit(1);
}