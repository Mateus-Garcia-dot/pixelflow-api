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

test('should evaluate ADD', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'ADD', left: 5, right: 3 }, context);
  assert.strictEqual(result, 8);
});

test('should evaluate SUBTRACT', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'SUBTRACT', left: 10, right: 4 }, context);
  assert.strictEqual(result, 6);
});

test('should evaluate MULTIPLY', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'MULTIPLY', left: 6, right: 7 }, context);
  assert.strictEqual(result, 42);
});

test('should evaluate DIVIDE', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'DIVIDE', left: 20, right: 4 }, context);
  assert.strictEqual(result, 5);
});

test('should evaluate POWER', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'POWER', left: 2, right: 3 }, context);
  assert.strictEqual(result, 8);
});

test('should evaluate MODULO', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'MODULO', dividend: 10, divisor: 3 }, context);
  assert.strictEqual(result, 1);
});

test('should evaluate ABS', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'ABS', value: -5 }, context);
  assert.strictEqual(result, 5);
});

test('should evaluate ROUND', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'ROUND', value: 4.6 }, context);
  assert.strictEqual(result, 5);
});

test('should evaluate FLOOR', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'FLOOR', value: 4.9 }, context);
  assert.strictEqual(result, 4);
});

test('should evaluate CEILING', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'CEILING', value: 4.1 }, context);
  assert.strictEqual(result, 5);
});

test('should evaluate MIN', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'MIN', a: 10, b: 5 }, context);
  assert.strictEqual(result, 5);
});

test('should evaluate MAX', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'MAX', a: 10, b: 5 }, context);
  assert.strictEqual(result, 10);
});

test('should evaluate RANDOM in range', () => {
  const context = new ExecutionContext();
  const result = evaluate({ op: 'RANDOM', from: 1, to: 10 }, context);
  assert.ok(result >= 1 && result <= 10);
});

test('should evaluate nested expressions', () => {
  const context = new ExecutionContext();
  context.set('position', 5);

  const result = evaluate({
    op: 'MULTIPLY',
    left: { op: 'ADD', left: { var: 'position' }, right: 1 },
    right: 2
  }, context);

  assert.strictEqual(result, 12);
});
