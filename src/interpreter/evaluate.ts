import type { Value } from '../shared/bytecode';
import type { ExecutionContext } from './context';

export function evaluate(value: Value, context: ExecutionContext): number {
  if (typeof value === 'number') {
    return value;
  }
  return context.get(value.var);
}
