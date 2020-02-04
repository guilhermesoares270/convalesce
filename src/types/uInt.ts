export type Uint = number & {
  __value__: never;
};

export const isUint = (number: number): number is Uint => {
  return isFinite(number) && Math.floor(number) === number && number >= 0;
};

export const uint = (value: unknown): Uint => {
  if (typeof value !== 'number') throw Error('Only numbers allowed');
  if (!isUint(value)) throw Error('The input is not a unsigned integer');
  return value;
};