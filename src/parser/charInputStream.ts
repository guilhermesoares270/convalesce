// const InputStream = (input: string) => {
//   let pos = 0, line = 1, col = 0;
//   return {
//     next: next,
//     peek: peek,
//     eof: eof,
//     croak: croak,
//   };
//   function next(): string {
//     let ch = input.charAt(pos++);
//     if (ch == "\n") line++ , col = 0; else col++;
//     return ch;
//   };
//   function peek(): string { return input.charAt(pos) };
//   function eof(): boolean {
//     return peek() == '';
//   };
//   function croak(message: string): void {
//     throw new Error(`${message}(${line}:${col})`);
//   };
// };

// const InputStream = (input: string): {
//   next: () => string,
//   peek: () => string,
//   eof: () => boolean,
//   croak: (message: string) => void
// } => {
//   let pos = 0, line = 1, col = 0;
//   const next = (): string => {
//     let ch = input.charAt(pos++);
//     if (ch == "\n") line++ , col = 0; else col++;
//     return ch;
//   };
//   const peek = (): string => (input.charAt(pos));
//   const eof = (): boolean => (peek() == '');
//   const croak = (message: string): void => { throw Error(`${message}(${line}:${col})`) }
//   return {
//     next: next,
//     peek: peek,
//     eof: eof,
//     croak: croak,
//   };
// };

/**Type example */

import {
  Char,
  char,
  isChar
} from '../types/char';


export const InputStream = (input: string): {
  next: () => Char,
  peek: () => Char,
  eof: () => boolean,
  croak: (message: string) => void
} => {
  let pos = 0, line = 1, col = 0;
  const next = (): Char => {
    let ch: Char = char(input.charAt(pos++));
    if (ch == "\n") line++ , col = 0; else col++;
    return ch;
  };
  const peek = (): Char => (char(input.charAt(pos)));
  const eof = (): boolean => (peek() == '');
  const croak = (message: string): void => { throw Error(`${message}(${line}:${col})`) }
  return {
    next: next,
    peek: peek,
    eof: eof,
    croak: croak,
  };
};