import type { LED } from './types';
import type { Program } from '../shared/bytecode';
import { UnknownInstructionError } from './errors';
import instructions from './instructions';

export class Runner {
  private leds: LED[];

  constructor(ledCount: number) {
    this.leds = Array(ledCount).fill(null).map(() => ({
      r: 0,
      g: 0,
      b: 0
    }));
  }

  run(bytecode: Program): LED[] {
    for (const instruction of bytecode.instructions) {
      switch (instruction.op) {
        case 'SET_LED':
          instructions.executeSetLED(this.leds, instruction.position, instruction.color);
          break;
        case 'SET_LED_RANGE':
          instructions.executeSetLEDRange(this.leds, instruction.start, instruction.end, instruction.color);
          break;
        default:
          throw new UnknownInstructionError(instruction.op);
      }
    }
    return this.leds;
  }
}
