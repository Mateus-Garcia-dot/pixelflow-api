export class ExecutionContext {
  private variables: Map<string, number> = new Map();

  set(name: string, value: number): void {
    this.variables.set(name, value);
  }

  get(name: string): number {
    if (!this.has(name)) {
      throw new Error(`Variable '${name}' is not defined`);
    }
    const value = this.variables.get(name);
    return value!;
  }

  has(name: string): boolean {
    return this.variables.has(name);
  }
}
