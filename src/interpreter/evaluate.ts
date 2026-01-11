import type { Value } from '../shared/bytecode';
import type { ExecutionContext } from './context';

export function evaluate(value: Value, context: ExecutionContext): number {
  if (typeof value === 'number') {
    return value;
  }

  if ('var' in value) {
    return context.get(value.var);
  }

  switch (value.op) {
    case 'ADD':
      return evaluate(value.left, context) + evaluate(value.right, context);
    case 'SUBTRACT':
      return evaluate(value.left, context) - evaluate(value.right, context);
    case 'MULTIPLY':
      return evaluate(value.left, context) * evaluate(value.right, context);
    case 'DIVIDE':
      return evaluate(value.left, context) / evaluate(value.right, context);
    case 'POWER':
      return Math.pow(evaluate(value.left, context), evaluate(value.right, context));

    case 'MODULO':
      return evaluate(value.dividend, context) % evaluate(value.divisor, context);

    case 'ABS':
      return Math.abs(evaluate(value.value, context));
    case 'ROUND':
      return Math.round(evaluate(value.value, context));
    case 'FLOOR':
      return Math.floor(evaluate(value.value, context));
    case 'CEILING':
      return Math.ceil(evaluate(value.value, context));

    case 'RANDOM':
      const from = evaluate(value.from, context);
      const to = evaluate(value.to, context);
      return Math.floor(Math.random() * (to - from + 1)) + from;

    case 'MIN':
      return Math.min(evaluate(value.a, context), evaluate(value.b, context));
    case 'MAX':
      return Math.max(evaluate(value.a, context), evaluate(value.b, context));

    default:
      throw new Error(`Unknown operation: ${(value as any).op}`);
  }
}
