import type { LED } from './types';
import type { Color , SetLEDInstruction, SetLEDRangeInstruction } from '../shared/bytecode';

function executeSetLED(leds: LED[], position: number, color: Color): void {
  leds[position] = {r: color.r, g: color.g, b: color.b };
}

function executeSetLEDRange(leds: LED[], position_start: number, position_end: number, color: Color): void {
  for (let current_position = position_start; current_position <= position_end; current_position++) {
    executeSetLED(leds, current_position, color)
  }
}

function executeDelay(leds: LED[], instruction: number): void {
  // No-op - delay is handled by the executor/device
}

function executeSetAllLEDs(leds: LED[], color: Color): void {
  executeSetLEDRange(leds, 0, leds.length - 1, color);
}

function executeLoop(leds: LED[], times: number, body: Instruction[], executeInstruction: (instruction: Instruction) => void): void {
  for (let i = 0; i < times; i++) {
    for (const instruction of body) {
      executeInstruction(instruction);
    }
  }
}

export default { executeSetLED, executeSetLEDRange, executeDelay, executeSetAllLEDs, executeLoop };
