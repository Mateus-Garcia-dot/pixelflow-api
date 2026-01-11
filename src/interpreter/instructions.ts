import type { LED } from './types';
import type { Color, Value, Instruction } from '../shared/bytecode';
import type { ExecutionContext } from './context';
import { evaluate } from './evaluate';

function executeSetLED(leds: LED[], position: Value, color: Color, context: ExecutionContext): void {
  const pos = evaluate(position, context);
  leds[pos] = { r: color.r, g: color.g, b: color.b };
}

function executeSetLEDRange(leds: LED[], position_start: Value, position_end: Value, color: Color, context: ExecutionContext): void {
  const start = evaluate(position_start, context);
  const end = evaluate(position_end, context);

  for (let current_position = start; current_position <= end; current_position++) {
    executeSetLED(leds, current_position, color, context);
  }
}

function executeDelay(leds: LED[], ms: Value, context: ExecutionContext): void {
  const delay = evaluate(ms, context);
  // No-op - delay is handled by the executor/device
}

function executeSetAllLEDs(leds: LED[], color: Color, context: ExecutionContext): void {
  executeSetLEDRange(leds, 0, leds.length - 1, color, context);
}

function executeLoop(leds: LED[], times: Value, body: Instruction[], executeInstruction: (instruction: Instruction) => void, context: ExecutionContext): void {
  const loopCount = evaluate(times, context);

  for (let i = 0; i < loopCount; i++) {
    for (const instruction of body) {
      executeInstruction(instruction);
    }
  }
}

function executeForEach(leds: LED[], variable: string, from: Value, to: Value, body: Instruction[], executeInstruction: (instruction: Instruction) => void, context: ExecutionContext): void {
  const start = evaluate(from, context);
  const end = evaluate(to, context);

  for (let i = start; i <= end; i++) {
    context.set(variable, i);
    for (const instruction of body) {
      executeInstruction(instruction);
    }
  }
}

export default { executeSetLED, executeSetLEDRange, executeDelay, executeSetAllLEDs, executeLoop, executeForEach};
