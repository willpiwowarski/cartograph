import { Edge } from "./callgraph";

export class CallGraph {
  // node -> set of nodes it calls (follow arrows forward)
  private callees = new Map<string, Set<string>>();
  // node -> set of nodes that call it (follow arrows backward)
  private callers = new Map<string, Set<string>>();

  constructor(edges: Edge[]) {
    for (const { from, to } of edges) {
      this.addEdge(from, to);
    }
  }

  private addEdge(from: string, to: string): void {
    if (!this.callees.has(from)) this.callees.set(from, new Set());
    if (!this.callers.has(to)) this.callers.set(to, new Set());
    this.callees.get(from)!.add(to);
    this.callers.get(to)!.add(from);
  }

  // What does this function call directly? (one hop forward)
  whatItCalls(name: string): string[] {
    return [...(this.callees.get(name) ?? [])];
  }

  // Who calls this function directly? (one hop backward)
  whoCalls(name: string): string[] {
    return [...(this.callers.get(name) ?? [])];
  }

  // Collect every node reachable from `start` by following `adjacency`.
  private reach(start: string, adjacency: Map<string, Set<string>>): string[] {
    const visited = new Set<string>();
    const queue = [start];

    while (queue.length > 0) {
      const current = queue.shift()!;             // take the next node (FIFO = BFS)
      for (const neighbor of adjacency.get(current) ?? []) {
        if (!visited.has(neighbor)) {             // skip anything we've already seen
          visited.add(neighbor);
          queue.push(neighbor);                   // explore its neighbors later
        }
      }
    }
    return [...visited];
  }

  // Everything that transitively depends on `name` — what breaks if you change it.
  whatReaches(name: string): string[] {
    return this.reach(name, this.callers);
  }

  // Everything `name` transitively depends on.
  reachableFrom(name: string): string[] {
    return this.reach(name, this.callees);
  }

  // Find a call path from `from` to `to` (following calls forward). Shortest one, or null.
  tracePath(from: string, to: string): string[] | null {
    const visited = new Set<string>([from]);
    const queue: string[][] = [[from]];   // a queue of PATHS, each starting at `from`

    while (queue.length > 0) {
      const path = queue.shift()!;
      const current = path[path.length - 1];   // the node this path currently ends at

      if (current === to) return path;          // arrived — this path is the answer

      for (const neighbor of this.callees.get(current) ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);       // same path, extended by one hop
        }
      }
    }
    return null;   // `from` cannot reach `to`
  }

}