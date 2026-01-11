import { test } from 'node:test';
import assert from 'node:assert';
import { ExecutionContext } from '../../src/interpreter/context';

test('should set and get a variable', () => {
  const context = new ExecutionContext();
  context.set('myVar', 42);

  assert.strictEqual(context.get('myVar'), 42);
});

test('should throw error when getting undefined variable', () => {
  const context = new ExecutionContext();

  assert.throws(
    () => context.get('notDefined'),
    (err: Error) => {
      return err.message.includes('notDefined') && err.message.includes('not defined');
    }
  );
});

test('should return true for existing variable with has()', () => {
  const context = new ExecutionContext();
  context.set('myVar', 100);

  assert.strictEqual(context.has('myVar'), true);
});

test('should return false for non-existing variable with has()', () => {
  const context = new ExecutionContext();

  assert.strictEqual(context.has('notThere'), false);
});

test('should update existing variable', () => {
  const context = new ExecutionContext();
  context.set('counter', 1);
  context.set('counter', 2);

  assert.strictEqual(context.get('counter'), 2);
});
