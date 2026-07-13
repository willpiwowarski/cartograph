import { add } from "./math";

// Arrow function assigned to a const — a *named* callable. It calls the
// imported function declaration `add`, but from inside an anonymous
// `.forEach()` callback: that callback is transparent, so the edge is
// attributed to `accumulate`, not to the nameless arrow.
export const accumulate = (xs: number[]): number => {
  let total = 0;
  xs.forEach((x) => {
    total = add(total, x);
  });
  return total;
};

// Arrow-const calling another arrow-const.
export const summarize = (xs: number[]): string => {
  return `sum=${accumulate(xs)}`;
};

// Function expression assigned to a const — also a named callable.
const format = function (label: string, value: string): string {
  return `${label}: ${value}`;
};

// Arrow-const calling a function-expression const.
export const report = (xs: number[]): string => {
  return format("report", summarize(xs));
};
