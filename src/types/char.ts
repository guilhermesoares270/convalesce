export type Char = string & {
  __value__: never
};

export const isChar = (str: string): str is Char => str.length === 1;

/**
 * Char type constructor
 * 
 */
export const char = (input: unknown): Char => {
  if (typeof input !== 'string') {
    throw new Error('Invalid input');
  };

  if (!isChar(input)) {
    throw new Error('A char must be of 1 length');
  };
  return input;
};