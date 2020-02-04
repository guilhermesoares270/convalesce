export type Int = number & {
  __value__: never;
};

export const isInt = (value: number): value is Int => {
  return isFinite(value) && Math.floor(value) === value;
};

export const int = (value: unknown): Int => {
  if (typeof value !== 'number') {
    throw new Error('Only numbers allowed');
  }
  if (!isInt(value)) {
    throw new Error('The input is not a integer');
  }
  return value;
};