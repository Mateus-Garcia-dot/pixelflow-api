export class UnknownInstructionError extends Error {
  constructor(op: string) {
    super(`Unknown instruction: ${op}`);
    this.name = 'UnknownInstructionError';
  }
}
