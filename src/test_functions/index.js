const rps = require("./rps");
const palindrom = require("./palindrom");
const xox = require("./xox");
const battlefield = require("./battlefield");
const multiplication = require("./multiplication");
const chess = require('./chess')
const sudoku = require('./sudoku')
let maze = require('./maze')
let turing = require('./turing')
const graph = require("./graph");

/*
+ rock scissor paper
+ general palindrome
+ nxn xox tie
+ check
+ labyrinth solvable?
+ war who wins
+ sudoku
+ n digit multiplication
+ graph connected?
+ universal turing machine
*/

module.exports = [
  rps,
  palindrom,
  xox,
  chess,
  maze,
  battlefield,
  sudoku,
  multiplication,
  graph,
  turing
];