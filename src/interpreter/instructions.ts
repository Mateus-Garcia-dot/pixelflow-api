import type { LED } from './types';
import type { SetLEDInstruction } from '../shared/bytecode';

function executeSetLED(leds: LED[], instruction: SetLEDInstruction): void {
  leds[instruction.position] = instruction.color;
}

export default { executeSetLED };
