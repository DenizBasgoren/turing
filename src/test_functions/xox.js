module.exports = function () {
    let tests = [];

    const testRules = {
        3: {},
        4: {},
        5: {},
        6: {}
    }

    generate_test_rules(testRules);

    for (const key in testRules) {
        for (let i = 0; i < testRules[key].D; i++) {
            const game = generate_draw_game(key);
            const tape = generate_tape(game);
            tests.push({
                tape,
                expected: true
            })
        }
        for (let i = 0; i < testRules[key].ND; i++) {
            const game = generate_not_draw_game(key);
            const tape = generate_tape(game);
            tests.push({
                tape,
                expected: false
            })
        }
    }

    return tests;
}

function initialize_table(size) {
    const players = ["X", "O"];
    let table = new Array(size);
    for (let i = 0; i < size; i++) {
        table[i] = new Array(size);
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const randomIndex = Math.floor(Math.random() * 2)
            const randomPlayer = players[randomIndex];
            table[i][j] = randomPlayer;
        }
    }

    return table;
}

function transpose(table) {
    let newTable = initialize_table(table.length);
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table.length; j++) {
            newTable[j][i] = table[i][j];
        }
    }

    return newTable;
}

function is_all_same(array) {
    return array.every(element => element === array[0]);
}

// true: draw
// false: not draw
function status(table) {
    return (
        check_rows(table) &&
        check_columns(table) &&
        check_diagonals(table))
}

function generate_draw_game(size) {
    let table;
    do {
        table = initialize_table(size);
    } while (!status(table));

    return table;
}

function generate_not_draw_game(size) {
    let table;
    do {
        table = initialize_table(size);
    } while (status(table));

    return table;
}

function check_rows(table) {
    let error = false;
    for (let i = 0; i < table.length; i++) {
        if (is_all_same(table[i])) {
            error = true;
            break;
        }
    }

    return !error;
}

function check_columns(table) {
    let error = false;
    const transposedTable = transpose(table);
    for (let i = 0; i < transposedTable.length; i++) {
        if (is_all_same(transposedTable[i])) {
            error = true;
            break;
        }
    }

    return !error;
}

function check_diagonals(table) {
    let firstDiagonal = [];
    let secondDiagonal = [];

    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table.length; j++) {
            if (i === j)
                firstDiagonal.push(table[i][j]);
        }
    }

    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table.length; j++) {
            if (i + j === table.length - 1) {
                secondDiagonal.push(table[i][j]);
            }
        }
    }
    return !(is_all_same(firstDiagonal) || is_all_same(secondDiagonal));
}

function generate_test_rules(template) {
    const amounts = [12, 13];
    for (const sizeKey in template) {
        const status = template[sizeKey];
        const randomAmountIndex = Math.floor(Math.random() * 2);
        const randomAmount = amounts[randomAmountIndex];
        status.D = randomAmount;
        status.ND = amounts.filter(amount => amount !== randomAmount)[0];
    }
}

function generate_tape(table) {
    const tape = {};
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table.length; j++) {
            tape[`${i} ${j}`] = table[i][j];
        }
    }

    return tape;
}