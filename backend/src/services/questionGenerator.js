export const generateQuestion = () => {
  let a = Math.floor(Math.random() * 100);
  let b = Math.floor(Math.random() * 100);

  const operators = ["+", "-", "*"];
  const op = operators[Math.floor(Math.random() * operators.length)];

  let answer;

  if (op === "+") {
    answer = a + b;
  }

  if (op === "-") {
    if (a < b) {
      [a, b] = [b, a]; 
    }
    answer = a - b;
  }

  if (op === "*") {
    answer = a * b;
  }

  return {
    question: `${a} ${op} ${b}`,
    answer,
  };
};