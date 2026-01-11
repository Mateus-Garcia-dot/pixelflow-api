export interface Color {
  r: number;
  g: number;
  b: number;
}

export interface SetLEDInstruction {
  op: 'SET_LED';
  position: number;
  color: Color;
}

export interface SetLEDRangeInstruction {
  op: 'SET_LED_RANGE';
  start: number;
  end: number;
  color: Color;
}

export type Instruction =
  | SetLEDInstruction
  | SetLEDRangeInstruction;

export interface Program {
  instructions: Instruction[];
}
