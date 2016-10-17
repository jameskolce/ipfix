const isNumber = /[0-9]/;

const priority = {
  "^": 4,
  "*": 3,
  "/": 3,
  "+": 2,
  "-": 2,
  "(": 1
};

module.exports = (operation) => {
  const tokens = operation.split(/(\+|-|\*|\/|\^|\(|\))/)
                          .filter(x => (x !== ''));

  const operators = [];
  const result = [];

  for (let token of tokens) {
    if (isNumber.test(token)) result.push(token);
    else if (token == '(') operators.push(token);
    else if (token == ')') {
      let topToken = operators.pop();

      while (topToken != '(') {
        result.push(topToken);
        topToken = operators.pop();
      }
    }
    else {
      while (operators.length != 0 && (priority[operators[operators.length-1]] >= priority[token])) {
        result.push(operators.pop());
      }

      operators.push(token);
    }
  }

  while (operators.length != 0) {
    result.push(operators.pop());
  }

  return result.join(" ");
};