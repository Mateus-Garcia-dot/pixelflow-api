import type { LED } from './types';
import type { Program, Instruction } from '../shared/bytecode';
import { UnknownInstructionError } from './errors';
import { ExecutionContext } from './context';
import instructions from './instructions';

export class Runner {
  private leds: LED[];
  private context: ExecutionContext;

  constructor(ledCount: number) {
    this.leds = Array(ledCount).fill(null).map(() => ({
      r: 0,
      g: 0,
      b: 0
    }));
    this.context = new ExecutionContext();
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
        instructions.executeSetLED(this.leds, instruction.position, instruction.color, this.context);
        break;
      case 'SET_LED_RANGE':
        instructions.executeSetLEDRange(this.leds, instruction.start, instruction.end, instruction.color, this.context);
        break;
      case 'DELAY':
        instructions.executeDelay(this.leds, instruction.ms, this.context);
        break;
      case 'SET_ALL_LEDS':
        instructions.executeSetAllLEDs(this.leds, instruction.color, this.context);
        break;
      case 'LOOP':
        instructions.executeLoop(this.leds, instruction.times, instruction.body, (inst) => this.executeInstruction(inst), this.context);
        break;
      case 'FOR_EACH':
        instructions.executeForEach(this.leds, instruction.variable, instruction.from, instruction.to, instruction.body, (inst) => this.executeInstruction(inst), this.context);
        break;
      default:
        throw new UnknownInstructionError(instruction.op);
    }
  }
}
