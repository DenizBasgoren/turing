module.exports = function () {
  let tests = [];

  // Even length palindrom
  for (let i = 0; i < 25; i++) {
    const length = generate_even_number();
    const word = generate_palindrom(length);
    const tape = generate_tape(word);

    tests.push({
      tape,
      expected: true
    });
  }

  // Odd length palindrom
  for (let i = 0; i < 25; i++) {
    const length = generate_odd_number();
    const word = generate_palindrom(length);
    const tape = generate_tape(word);

    tests.push({
      tape,
      expected: true
    });
  }

  // Even length not palindrom
  for (let i = 0; i < 25; i++) {
    const length = generate_even_number();
    const word = generate_non_palindrom(length);
    const tape = generate_tape(word);

    tests.push({
      tape,
      expected: false
    });
  }

  // Odd length not palindrom
  for (let i = 0; i < 25; i++) {
    let length = generate_odd_number();
    if (length === 1) {
      do {
        length = generate_odd_number();
      } while (length === 1);
    }

    const word = generate_non_palindrom(length);
    const tape = generate_tape(word);

    tests.push({
      tape,
      expected: false
    });
  }

  return tests;
};

function generate_palindrom(length) {
  let word = [];

  for (let i = 0; i < length; i++) {
    const char = get_char();
    word[i] = char;
    word[length - 1 - i] = char;
  }

  return word;
}

function generate_non_palindrom(length) {
  let word = [];
  for (let i = 0; i < length; i++) {
    let char = get_char();
    if (char === word[length - 1 - i]) {
      do {
        char = get_char();
      } while (char === word[length - 1 - i]);
    }
    word[i] = char;
  }

  return word;
}

// 2,4,6,8
function generate_even_number() {
  return Math.floor(Math.random() * 4) * 2 + 2;
}

// 1,3,5,7
function generate_odd_number() {
  return Math.floor(Math.random() * 4) * 2 + 1;
}

function get_char() {
  const num = Math.floor(Math.random() * 26) + 65;
  const char = String.fromCharCode(num);

  return char;
}

function generate_tape(word) {
  const tape = {};
  for (let i = 0; i < word.length; i++) {
    tape[`${i} 0`] = word[i];
  }

  return tape;
}