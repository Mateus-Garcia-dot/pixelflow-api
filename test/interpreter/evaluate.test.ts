import { test } from 'node:test';
import assert from 'node:assert';
import { evaluate } from '../../src/interpreter/evaluate';
import { ExecutionContext } from '../../src/interpreter/context';

test('should evaluate literal number', () => {
  const context = new ExecutionContext();
  const result = evaluate(42, context);

  assert.strictEqual(result, 42);
});

test('should evaluate variable reference', () => {
  const context = new ExecutionContext();
  context.set('position', 10);

  const result = evaluate({ var: 'position' }, context);

  assert.strictEqual(result, 10);
});

test('should throw error for undefined variable', () => {
  const context = new ExecutionContext();

  assert.throws(
    () => evaluate({ var: 'undefined' }, context),
    (err: Error) => {
      return err.message.includes('undefined') && err.message.includes('not defined');
    }
  );
});
