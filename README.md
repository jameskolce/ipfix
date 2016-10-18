# IPFix [![Build Status](https://travis-ci.org/jameskolce/ipfix.svg?branch=master)](https://travis-ci.org/jameskolce/ipfix)

> Infix to postfix notation transformer for simple mathematical operations.
> Also a simple postfix calculator.

**Supported operations:**

- Addition (+)
- Subtraction (-)
- Multiplication (*)
- Division (/)
- Pow (^)

## Installation

```
npm install ipfix
```

## Examples

```JS
const ipfix = require("ipfix");

/*
 *
 * Transformation
 *
 */

const example1 = ipfix.transform('1+1');
// example1 = '1 1 +'

const example2 = ipfix.transform('14+2^2');
// example2 = '14 2 2 ^ +'

const example3 = ipfix.transform('(11+2*37.7)/(2-1)');
// example3 = '11 2 37.7 * + 2 1 - /'

const example4 = ipfix.transform('(1+253)^2');
// example4 = '1 253 + 2 ^'

/*
 *
 * Evaluation
 *
 */

const example5 = ipfix.calculate('1 2 3 * 2 / + 1 -');
// example5 = '3'

const example6 = ipfix.calculate('11 2.5 37 * + 2 1 - /');
// example6 = '103.5'

const example7 = ipfix.calculate('1.75 253 + 2 ^');
// example7 = '64897.5625'

const example8 = ipfix.calculate('1 25 3 * +');
// example8 = '76'

```

## API

### calculate(expression)

Evaluates a postfix expression and returns the result.

**Example:**

```JS
ipfix.calculate('1 22 3 * +') // 67
```

### transform(expression)

Transforms an infix expression into a postfix expression.

**Example:**

```JS
ipfix.transform('1+22*3') // 1 22 3 * +
```

## License

MIT - James Kolce