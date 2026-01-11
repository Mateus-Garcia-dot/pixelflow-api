export interface Color {
  r: number;
  g: number;
  b: number;
}

export type Value = number | { var: string };

export interface SetLEDInstruction {
  op: 'SET_LED';
  position: Value;
  color: Color;
}

export interface SetLEDRangeInstruction {
  op: 'SET_LED_RANGE';
  start: Value;
  end: Value;
  color: Color;
}

export interface DelayInstruction {
  op: 'DELAY';
  ms: Value;
}

export interface SetAllLEDsInstruction {
  op: 'SET_ALL_LEDS';
  color: Color;
}

export interface LoopInstruction {
  op: 'LOOP';
  times: Value;
  body: Instruction[];
}

export interface ForEachInstruction {
  op: 'FOR_EACH';
  variable: string;
  from: Value;
  to: Value;
  body: Instruction[];
}

export type Instruction =
  | SetLEDInstruction
  | SetLEDRangeInstruction
  | DelayInstruction
  | SetAllLEDsInstruction
  | LoopInstruction
  | ForEachInstruction;

export interface Program {
  instructions: Instruction[];
}
