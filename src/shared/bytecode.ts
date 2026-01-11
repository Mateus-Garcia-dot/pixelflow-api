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

export interface DelayInstruction {
  op: 'DELAY';
  ms: number;
}

export interface SetAllLEDsInstruction {
  op: 'SET_ALL_LEDS';
  color: Color;
}

export interface LoopInstruction {
  op: 'LOOP';
  times: number;
  body: Instruction[];
}

export type Instruction =
  | SetLEDInstruction
  | SetLEDRangeInstruction
  | DelayInstruction
  | SetAllLEDsInstruction;

export interface Program {
  instructions: Instruction[];
}
