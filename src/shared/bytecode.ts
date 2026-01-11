export interface Color {
  r: number;
  g: number;
  b: number;
}

export interface BinaryMathExpression {
  op: 'ADD' | 'SUBTRACT' | 'MULTIPLY' | 'DIVIDE' | 'POWER';
  left: Value;
  right: Value;
}

export interface ModuloExpression {
  op: 'MODULO';
  dividend: Value;
  divisor: Value;
}

export interface UnaryMathExpression {
  op: 'ABS' | 'ROUND' | 'FLOOR' | 'CEILING';
  value: Value;
}

export interface RandomExpression {
  op: 'RANDOM';
  from: Value;
  to: Value;
}

export interface MinMaxExpression {
  op: 'MIN' | 'MAX';
  a: Value;
  b: Value;
}

export type Value =
  | number
  | { var: string }
  | BinaryMathExpression
  | ModuloExpression
  | UnaryMathExpression
  | RandomExpression
  | MinMaxExpression;

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
