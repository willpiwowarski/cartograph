import { double } from "./math";
import { add as sum } from "./math";   // aliased import

export function perimeter(side: number): number {
  return double(side) * 4;             // calls double (imported)
}

export function total(a: number, b: number): number {
  return sum(a, b);                    // calls add, but written as `sum`
}