module.exports = function() {
  let tests = [];

  for (let i = 0; i < 50; i++) {
    const calculation = generate_correct();
    const tape = generate_tape(calculation);

    tests.push({
      tape,
      expected: true
    });
  }

  for (let i = 0; i < 25; i++) {
    const calculation = generate_random_wrong();
    const tape = generate_tape(calculation);

    tests.push({
      tape,
      expected: false
    });
  }

  for (let i = 0; i < 25; i++) {
    const calculation = generate_one_digit_different();
    const tape = generate_tape(calculation);

    tests.push({
      tape,
      expected: false
    });
  }

  return tests;
};

function generate_correct() {
  let num1, num2, result;
  num1 = Math.floor(Math.random() * 9999) + 1;
  num2 = Math.floor(Math.random() * 9999) + 1;
  result = num1 * num2;

  return { num1, num2, result };
}

function generate_random_wrong() {
  let num1, num2, result;
  num1 = Math.floor(Math.random() * 9999) + 1;
  num2 = Math.floor(Math.random() * 9999) + 1;
  result = num1 * num2;
  result = result.toString();

  return { num1, num2, result };
}

function generate_one_digit_different() {
  let num1, num2, result, randomDigitIndex, randomDigit;
  num1 = Math.floor(Math.random() * 9999) + 1;
  num2 = Math.floor(Math.random() * 9999) + 1;
  result = num1 * num2;
  result = result.toString();
  randomDigitIndex = Math.floor(Math.random() * result.length);

  do {
    randomDigit = Math.floor(Math.random() * 10);
  } while (randomDigit === parseInt(result[randomDigitIndex]));

  result =
    result.substr(0, randomDigitIndex) +
    randomDigit.toString() +
    result.substr(randomDigitIndex + 1);

  result = parseInt(result);

  return { num1, num2, result };
}

function generate_tape(calculation) {
  let { num1, num2, result } = calculation;
  const tape = {};
  num1 = num1.toString();
  num2 = num2.toString();
  result = result.toString();

  for (let i = 0; i < num1.length; i++) {
    tape[`${i} 0`] = num1[i];
  }

  for (let i = 0; i < num2.length; i++) {
    tape[`${i} 1`] = num2[i];
  }

  for (let i = 0; i < result.length; i++) {
    tape[`${i} 2`] = result[i];
  }

  return tape;
}
