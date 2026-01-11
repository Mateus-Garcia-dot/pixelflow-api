import type { LED } from './types';
import type { SetLEDInstruction, SetLEDRangeInstruction } from '../shared/bytecode';

function executeSetLED(leds: LED[], instruction: SetLEDInstruction): void {
  leds[instruction.position] = instruction.color;

}

export function executeSetLEDRange(leds: LED[], instruction: SetLEDRangeInstruction): void {
  for (let i = instruction.start; i <= instruction.end; i++) {
    leds[i] = instruction.color;
  }
}

export default { executeSetLED, executeSetLEDRange };
