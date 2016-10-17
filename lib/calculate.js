const evaluate = (operator, operand1, operand2) => {
  if      (operator == '*') return operand1 * operand2;
  else if (operator == '/') return operand1 / operand2;
  else if (operator == '-') return operand1 - operand2;
  else if (operator == '+') return operand1 + operand2;
  else if (operator == '^') return Math.pow(operand1, operand2);
}

const isNumber = /[0-9]/;

module.exports = (expression) => {
  const tokens = expression.split(' ');
  const stack = [];

  for (const token of tokens) {
    if (isNumber.test(token)) stack.push(parseFloat(token));
    else {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      stack.push(evaluate(token, operand1, operand2));
    }
  }

  return stack.pop();
}