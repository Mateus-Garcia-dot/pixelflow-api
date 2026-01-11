import { test } from 'node:test';
import assert from 'node:assert';
import { Runner } from '../../src/interpreter/runner';

test('should return initialized LEDs when running empty bytecode', () => {
  const runner = new Runner(10);
  const program = { instructions: [] };
  const result = runner.run(program);

  assert.strictEqual(result.length, 10);
  assert.deepStrictEqual(result[0], { r: 0, g: 0, b: 0 });
});

test('should set LED to red', () => {
  const runner = new Runner(10);
  const program = {
    instructions: [
      {
        op: 'SET_LED' as const,
        position: 0,
        color: { r: 255, g: 0, b: 0 }
      }
    ]
  };
  const result = runner.run(program);

  assert.deepStrictEqual(result[0], { r: 255, g: 0, b: 0 });
  assert.deepStrictEqual(result[1], { r: 0, g: 0, b: 0 });
});

test('should throw error for unknown instruction', () => {
  const runner = new Runner(10);
  const program = {
    instructions: [
      { op: 'INVALID_OP' as any, position: 0 }
    ]
  };

  assert.throws(
    () => runner.run(program),
    (err: Error) => {
      return err.message === 'Unknown instruction: INVALID_OP';
    }
  );
});
