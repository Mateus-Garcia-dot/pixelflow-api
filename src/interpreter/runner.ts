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
      this.executeInstruction(instruction);
    }
    return this.leds;
  }

  private executeInstruction(instruction: Instruction): void {
    switch (instruction.op) {
      case 'SET_LED':
        instructions.executeSetLED(this.leds, instruction.position, instruction.color);
        break;
      case 'SET_LED_RANGE':
        instructions.executeSetLEDRange(this.leds, instruction.start, instruction.end, instruction.color);
        break;
      case 'DELAY':
        instructions.executeDelay(this.leds, instruction.ms);
        break;
      case 'SET_ALL_LEDS':
        instructions.executeSetAllLEDs(this.leds, instruction.color);
        break;
      case 'LOOP':
        instructions.executeLoop(this.leds, instruction.times, instruction.body, (inst) => this.executeInstruction(inst));
        break;
      default:
        throw new UnknownInstructionError(instruction.op);
    }
  }

}
