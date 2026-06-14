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

  cube(n: number): number {
    return this.square(n) * n;   // method call via `this`
  }
}

function run(): void {
  const calc = new Calculator();
  calc.square(5);                // method call via a variable
}