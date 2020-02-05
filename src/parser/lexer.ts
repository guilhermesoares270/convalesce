export type tokens = {
  punctuation: string,
  number: string,
  string: string,
  keyword: string,
  identifier: string,
  operator: string
};

type KeysEnum<T> = { [P in keyof Required<T>]: true };
const TokensKeys: KeysEnum<tokens> = {
  punctuation: true,
  number: true,
  string: true,
  keyword: true,
  identifier: true,
  operator: true
};

const isToken = (value: unknown): value is Token => {
  if (typeof value !== 'object' || value === null) throw Error('Invalid Value');
  if ((value as Token).type === undefined ||
    !Object.keys(TokensKeys).includes((value as Token).type)
  ) throw Error('Type is not defined or has an invalid value');
  return true;
};

interface Token {
  readonly type: keyof tokens,
  value?: string | number
};

type Read<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyToken = Read<Token>;

const punctuation: Token = { type: "punctuation", value: '' };
// const number: Token = { type: "number", value: 0 };
const str: Token = { type: "string", value: '"Hello World!"' };
const keyword: Token = { type: "keyword", value: '' };
const identifier: Token = { type: "identifier", value: '' };
const operator: Token = { type: "operator", value: '' };

// interface numberToken extends Token {
//   type: 'number',
//   value: string | number
// };

const isNumberToken = (token: Token): token is Token => (typeof token.type === 'number');

const numberToken = (input: unknown): Token => {
  // if (typeof input. !== 'string' && typeof input !== 'number') {
  //   throw Error('Invalid type provided');
  // };
  if (input instanceof Token) {
    throw Error('Invalid type provided');
  };
  if (!isNumberToken(input))
};

export default {
  punctuation,
  number,
  str,
  keyword,
  identifier, operator
};

const t = function read_while(input: inputStream, predicate: (ch: string) => boolean) {
  var str = "";
  while (!input.eof() && predicate(input.peek()))
    str += input.next();
  return str;
};

interface inputStream {
  next: () => string,
  peek: () => string,
  eof: () => boolean,
  croak: (message: string) => void
};

const InputStream = (input: inputStream): inputStream => {
  let current: string | null = null;
  const keywords = " if then else lambda λ true false ";
  let pos = 0, line = 1, col = 0;

  function is_keyword(x: string) {
    return keywords.indexOf(" " + x + " ") >= 0;
  }
  function is_digit(ch: string) {
    return /[0-9]/i.test(ch);
  }
  function is_id_start(ch: string) {
    return /[a-zλ_]/i.test(ch);
  }
  function is_id(ch: string) {
    return is_id_start(ch) || "?!-<>=0123456789".indexOf(ch) >= 0;
  }
  function is_op_char(ch: string) {
    return "+-*/%=&|<>!".indexOf(ch) >= 0;
  }
  function is_punc(ch: string) {
    return ",;(){}[]".indexOf(ch) >= 0;
  }
  function is_whitespace(ch: string) {
    return " \t\n".indexOf(ch) >= 0;
  }
  // function read_while(predicate: (ch: string) => boolean) {
  //   var str = "";
  //   while (!input.eof() && predicate(input.peek()))
  //     str += input.next();
  //   return str;
  // }
  const read_while = t.bind(null, input);
  const read_number = () => {
    var has_dot = false;
    var number1 = read_while(function (ch) {
      if (ch == ".") {
        if (has_dot) return false;
        has_dot = true;
        return true;
      }
      return is_digit(ch);
    });
    // return { type: "num", value: parseFloat(number) };
    const token = 
    return number;
  };
  // function read_number() {
  //   var has_dot = false;
  //   var number = read_while(function (ch) {
  //     if (ch == ".") {
  //       if (has_dot) return false;
  //       has_dot = true;
  //       return true;
  //     }
  //     return is_digit(ch);
  //   });
  //   return { type: "num", value: parseFloat(number) };
  // }
  function read_ident() {
    const id = read_while(is_id);
    return {
      type: is_keyword(id) ? "kw" : "var",
      value: id
    };
  }
  function read_escaped(end: string) {
    var escaped = false, str = "";
    input.next();
    while (!input.eof()) {
      var ch = input.next();
      if (escaped) {
        str += ch;
        escaped = false;
      } else if (ch == "\\") {
        escaped = true;
      } else if (ch == end) {
        break;
      } else {
        str += ch;
      }
    }
    return str;
  }
  function read_string() {
    return { type: "str", value: read_escaped('"') };
  }
  function skip_comment() {
    read_while(function (ch) { return ch != "\n" });
    input.next();
  }
  function read_next(): any {
    read_while(is_whitespace);
    if (input.eof()) return null;
    var ch = input.peek();
    if (ch == "#") {
      skip_comment();
      return read_next();
    }
    if (ch == '"') return read_string();
    if (is_digit(ch)) return read_number();
    if (is_id_start(ch)) return read_ident();
    if (is_punc(ch)) return {
      type: "punc",
      value: input.next()
    };
    if (is_op_char(ch)) return {
      type: "op",
      value: read_while(is_op_char)
    };
    input.croak("Can't handle character: " + ch);
  }

  function peek() {
    return current || (current = read_next());
  }
  function next() {
    var tok = current;
    current = null;
    return tok || read_next();
  }
  function eof() {
    return peek() == null;
  }

  const croak = (message: string): void => { throw Error(`${message}(${line}:${col})`) }
  return {
    next: next,
    peek: peek,
    eof: eof,
    croak: croak,
  };
};