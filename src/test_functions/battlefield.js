module.exports = function() {
  let tests = [];

  for (let i = 0; i < 50; i++) {
    const table = fill_table("Y", "E");
    const tape = generate_tape(table);

    tests.push({
      tape,
      expected: true
    });
  }

  for (let i = 0; i < 50; i++) {
    const table = fill_table("E", "Y");
    const tape = generate_tape(table);

    tests.push({
      tape,
      expected: false
    });
  }

  return tests;
};

function initialize_table(n, m) {
  let table = new Array(n);

  for (let i = 0; i < n; i++) {
    table[i] = new Array(m);
  }

  return table;
}

function generate_dimensions() {
  let n, m;
  n = Math.floor(Math.random() * 10) + 1;
  m = Math.floor(Math.random() * 10) + 1;

  return { n, m };
}

// winner: "Y" or "E"
function fill_table(winner, loser) {
  const { n, m } = generate_dimensions();
  const size = n * m;
  let table = initialize_table(n, m);

  const min = Math.ceil(size / 2);
  const max = size;

  let winnerAmount;
  do {
    winnerAmount = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (winnerAmount === size / 2);

  const coordinates = generate_winner_coordinates(winnerAmount, n, m);

  for (let i = 0; i < winnerAmount; i++) {
    const { x, y } = coordinates[i];
    table[x][y] = winner;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (table[i][j] === undefined) {
        table[i][j] = loser;
      }
    }
  }

  return table;
}

function generate_winner_coordinates(winnerAmount, n, m) {
  let coordinates = [];

  for (let i = 0; i < winnerAmount; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * n);
      y = Math.floor(Math.random() * m);
    } while (coordinates.some(c => x === c.x && y === c.y));

    coordinates.push({ x, y });
  }

  return coordinates;
}

function generate_tape(table) {
  const tape = {};
  for (let i = 0; i < table.length; i++) {
    const row = table[i];
    for (let j = 0; j < row.length; j++) {
      tape[`${i} ${j}`] = table[i][j];
    }
  }

  return tape;
}
