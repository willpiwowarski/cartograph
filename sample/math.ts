export function add(a: number, b: number): number {
  return a + b;
}

export function double(n: number): number {
  return add(n, n);
}

class Calculator {
  square(n: number): number {
    return double(n);
  }
}