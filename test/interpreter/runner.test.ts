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

test('should set LED range to blue', () => {
  const runner = new Runner(10);
  const program = {
    instructions: [
      {
        op: 'SET_LED_RANGE' as const,
        start: 2,
        end: 5,
        color: { r: 0, g: 0, b: 255 }
      }
    ]
  };
  const result = runner.run(program);

  assert.deepStrictEqual(result[0], { r: 0, g: 0, b: 0 });
  assert.deepStrictEqual(result[1], { r: 0, g: 0, b: 0 });
  assert.deepStrictEqual(result[2], { r: 0, g: 0, b: 255 });
  assert.deepStrictEqual(result[3], { r: 0, g: 0, b: 255 });
  assert.deepStrictEqual(result[4], { r: 0, g: 0, b: 255 });
  assert.deepStrictEqual(result[5], { r: 0, g: 0, b: 255 });
  assert.deepStrictEqual(result[6], { r: 0, g: 0, b: 0 });
});

test('should handle delay instruction (no-op)', () => {
  const runner = new Runner(10);
  const program = {
    instructions: [
      { op: 'SET_LED' as const, position: 0, color: { r: 255, g: 0, b: 0 } },
      { op: 'DELAY' as const, ms: 1000 },
      { op: 'SET_LED' as const, position: 1, color: { r: 0, g: 255, b: 0 } }
    ]
  };
  const result = runner.run(program);

  assert.deepStrictEqual(result[0], { r: 255, g: 0, b: 0 });
  assert.deepStrictEqual(result[1], { r: 0, g: 255, b: 0 });
});

test('should set all LEDs to green', () => {
  const runner = new Runner(10);
  const program = {
    instructions: [
      { op: 'SET_ALL_LEDS' as const, color: { r: 0, g: 255, b: 0 } }
    ]
  };
  const result = runner.run(program);

  result.forEach(led => {
    assert.deepStrictEqual(led, { r: 0, g: 255, b: 0 });
  });
});

test('should execute loop 3 times', () => {
  const runner = new Runner(10);
  const program = {
    instructions: [
      {
        op: 'LOOP' as const,
        times: 3,
        body: [
          { op: 'SET_LED' as const, position: 0, color: { r: 255, g: 0, b: 0 } },
          { op: 'SET_LED' as const, position: 1, color: { r: 0, g: 255, b: 0 } }
        ]
      }
    ]
  };
  const result = runner.run(program);

  assert.deepStrictEqual(result[0], { r: 255, g: 0, b: 0 });
  assert.deepStrictEqual(result[1], { r: 0, g: 255, b: 0 });
  assert.deepStrictEqual(result[2], { r: 0, g: 0, b: 0 });
});

test('should execute FOR_EACH with variable', () => {
  const runner = new Runner(10);
  const program = {
    instructions: [
      {
        op: 'FOR_EACH' as const,
        variable: 'position',
        from: 0,
        to: 3,
        body: [
          {
            op: 'SET_LED' as const,
            position: { var: 'position' },
            color: { r: 255, g: 0, b: 0 }
          }
        ]
      }
    ]
  };
  const result = runner.run(program);

  assert.deepStrictEqual(result[0], { r: 255, g: 0, b: 0 });
  assert.deepStrictEqual(result[1], { r: 255, g: 0, b: 0 });
  assert.deepStrictEqual(result[2], { r: 255, g: 0, b: 0 });
  assert.deepStrictEqual(result[3], { r: 255, g: 0, b: 0 });
  assert.deepStrictEqual(result[4], { r: 0, g: 0, b: 0 });
});

test('should throw error when using undefined variable', () => {
  const runner = new Runner(10);
  const program = {
    instructions: [
      {
        op: 'SET_LED' as const,
        position: { var: 'undefinedVar' },
        color: { r: 255, g: 0, b: 0 }
      }
    ]
  };

  assert.throws(
    () => runner.run(program),
    (err: Error) => {
      return err.message.includes('undefinedVar') && err.message.includes('not defined');
    }
  );
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

test('should use math expressions in FOR_EACH', () => {
  const runner = new Runner(10);
  const program = {
    instructions: [
      {
        op: 'FOR_EACH' as const,
        variable: 'i',
        from: 0,
        to: 2,
        body: [
          {
            op: 'SET_LED' as const,
            position: {
              op: 'ADD' as const,
              left: { var: 'i' },
              right: 1
            },
            color: { r: 255, g: 0, b: 0 }
          }
        ]
      }
    ]
  };
  const result = runner.run(program);

  assert.deepStrictEqual(result[0], { r: 0, g: 0, b: 0 });
  assert.deepStrictEqual(result[1], { r: 255, g: 0, b: 0 });
  assert.deepStrictEqual(result[2], { r: 255, g: 0, b: 0 });
  assert.deepStrictEqual(result[3], { r: 255, g: 0, b: 0 });
  assert.deepStrictEqual(result[4], { r: 0, g: 0, b: 0 });
});

test('should handle complex nested math expressions', () => {
  // equivalent code:
  //
  // for (let i = 0; i <= 4; i++) {
  //   const subtract = i - 2;
  //   const abs = Math.abs(subtract);
  //   const multiply = abs * 2;
  //   const max = Math.max(0, multiply);
  //   const position = Math.min(9, max);
  //   setLED(position, { r: 0, g: 255, b: 0 });
  // }

  const runner = new Runner(10);
  const program = {
    instructions: [
      {
        op: 'FOR_EACH' as const,
        variable: 'i',
        from: 0,
        to: 4,
        body: [
          {
            op: 'SET_LED' as const,
            position: {
              op: 'MIN' as const,
              a: 9,
              b: {
                op: 'MAX' as const,
                a: 0,
                b: {
                  op: 'MULTIPLY' as const,
                  left: {
                    op: 'ABS' as const,
                    value: {
                      op: 'SUBTRACT' as const,
                      left: { var: 'i' },
                      right: 2
                    }
                  },
                  right: 2
                }
              }
            },
            color: { r: 0, g: 255, b: 0 }
          }
        ]
      }
    ]
  };
  const result = runner.run(program);

  assert.deepStrictEqual(result[0], { r: 0, g: 255, b: 0 });
  assert.deepStrictEqual(result[1], { r: 0, g: 0, b: 0 });
  assert.deepStrictEqual(result[2], { r: 0, g: 255, b: 0 });
  assert.deepStrictEqual(result[3], { r: 0, g: 0, b: 0 });
  assert.deepStrictEqual(result[4], { r: 0, g: 255, b: 0 });
});
