const ipfix = require("./");

const test = require("tape");
const prettyfier = require('tap-spec');

// Make the output pretty
test.createStream()
    .pipe(prettyfier())
    .pipe(process.stdout);

const transform = ipfix.transform;
const calculate = ipfix.calculate;

/*
 *
 * Transformations
 *
 */

test('Transform simple terms', (t) => {
  t.equal(
      transform('1+1'), '1 1 +',
      '1+1 -> 1 1 +');

  t.equal(
      transform('1+22*3'), '1 22 3 * +',
      '1+22*3 -> 1 22 3 * +');

  t.equal(
      transform('1+2*3/2-1'), '1 2 3 * 2 / + 1 -',
      '1+2*3/2-1 -> 1 2 3 * 2 / + 1 -');

  t.equal(
      transform('14+2^2'), '14 2 2 ^ +',
      '14+2^2 -> 14 2 2 ^ +');

  t.end();
});

test('Transform complex terms', (t) => {
  t.equal(
      transform('(1+1)*29'), '1 1 + 29 *',
      '(1+1)*29 -> 1 1 + 29 *');

  t.equal(
      transform('1+(25*3)'), '1 25 3 * +',
      '1+(25*3) -> 1 25 3 * +');

  t.equal(
      transform('(11+2*37)/(2-1)'), '11 2 37 * + 2 1 - /',
      '(11+2*3)/(2-1) -> 11 2 37 * + 2 1 - /');

  t.equal(
      transform('(1+253)^2'), '1 253 + 2 ^',
      '(1+253)^2 -> 1 253 + 2 ^');

  t.end();
});

test('Transform complex terms with decimals', (t) => {
  t.equal(
      transform('(1.2+1)*29'), '1.2 1 + 29 *',
      '(1.2+1)*29 -> 1.2 1 + 29 *');

  t.equal(
      transform('1+(25.8*3)'), '1 25.8 3 * +',
      '1+(25.8*3) -> 1 25.8 3 * +');

  t.equal(
      transform('(11+2*37.7)/(2-1)'), '11 2 37.7 * + 2 1 - /',
      '(11+2*37.7)/(2-1) -> 11 2 37.7 * + 2 1 - /');

  t.equal(
      transform('(1.5+253)^2'), '1.5 253 + 2 ^',
      '(1.5+253)^2 -> 1.5 253 + 2 ^');

  t.end();
});

/*
 *
 * Calculations
 *
 */

test('Calculate simple terms', (t) => {
  t.equal(
      calculate(transform('1+1')), 2,
      '1+1 -> postfix = 2');

  t.equal(
      calculate(transform('1+22*3')), 67,
      '1+22*3 -> postfix = 67');

  t.equal(
      calculate(transform('1+2*3/2-1')), 3,
      '1+2*3/2-1 -> postfix = 3');

  t.equal(
      calculate(transform('14+2^2')), 18,
      '14+2^2 -> postfix = 18');

  t.end();
});

test('Calculate complex terms', (t) => {
  t.equal(
      calculate(transform('(1+1)*29')), 58,
      '(1+1)*29 -> postfix = 58');

  t.equal(
      calculate(transform('1+(25*3)')), 76,
      '1+(25*3) -> postfix = 76');

  t.equal(
      calculate(transform('(11+2*37)/(2-1)')), 85,
      '(11+2*3)/(2-1) -> postfix = 85');

  t.equal(
      calculate(transform('(1+253)^2')), 64516,
      '(1+253)^2 -> postfix = 64516');

  t.end();
});

test('Calculate complex terms with decimals', (t) => {
  t.equal(
      calculate(transform('(1+1.5)*29')), 72.5,
      '(1+1.5)*29 -> postfix = 72.5');

  t.equal(
      calculate(transform('1.5+(25*3)')), 76.5,
      '1.5+(25*3) -> postfix = 76.5');

  t.equal(
      calculate(transform('(11+2.5*37)/(2-1)')), 103.5,
      '(11+2.5*3)/(2-1) -> postfix = 103.5');

  t.equal(
      calculate(transform('(1.75+253)^2')), 64897.5625,
      '(1.75+253)^2 -> postfix = 64897.5625');

  t.end();
});