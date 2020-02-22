module.exports = function () {
  let tests = [];
  const OPTIONS = ["R", "S", "P"];
  for (let i = 0; i < OPTIONS.length; i++) {
    for (let j = 0; j < OPTIONS.length; j++) {
      let expected;
      if (
        (i === 0 && j === 1) ||
        (i === 1 && j === 2) ||
        (i === 2 && j === 0)
      )
        expected = true;
      else expected = false;
      tests.push({
        tape: {
          "0 0": OPTIONS[i],
          "1 0": OPTIONS[j],
        },
        expected
      });
    }
  }
  return tests;
};