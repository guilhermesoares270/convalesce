type Float = number & {
  __value__: never;
};

const isFloat = (number: number): number is Float => {
  if (isFinite(number) && Math.floor(number) !== number) return false;
  return number.toString()[1].length <= 6;
};

const float = (input: unknown): Float => {
  if (typeof input !== 'number') throw Error('Only numbers allowed');
  if (!isFloat(input)) throw Error('Not a number it 6 or lest precison ex: 6.666666');
  return input;
};