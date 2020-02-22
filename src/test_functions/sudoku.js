
const WIDTH = 2 // width of a block. regular sudokus have width=3

function goForward(current) {
    if (current.x === WIDTH*WIDTH-1) {
        current.x = 0
        current.y++
    }
    else {
        current.x++
    }
}

function goBackWard(current) {
    if (current.x === 0) {
        current.x = WIDTH*WIDTH-1
        current.y--
    }
    else {
        current.x--
    }
}

function doneAll(current) {
    return current.y === WIDTH*WIDTH
}


function generateFilledTable() {
    let table = Array(WIDTH*WIDTH).fill(true).map( r => {
        return Array(WIDTH*WIDTH).fill('')
    })
    
    for (let i = 0; i<WIDTH*WIDTH; i++) {
        for (let j = 0; j<WIDTH*WIDTH; j++) {
            table[i][j] = {
                value: 0,
                notAllowed: new Set()
            }
        }
    }
    
    let current = {y: 0, x: 0}
    
    while (true) {

        if ( doneAll(current) ) {
            break
        }
    
        let cell = table[current.y][current.x]
        cell.value = 0
    
        let legit = getLegit(table, current)
        let allowed = setDifference(legit, cell.notAllowed)
    
        if (allowed.size === 0) {
            cell.notAllowed.clear()
            goBackWard(current)
            
            continue
        }
        
        allowed = [ ...allowed ]
    
        let picked = allowed[ randomBetween(0, allowed.length) ]
    
        cell.value = picked
        cell.notAllowed.add( picked )
    
        goForward(current)
    
    }

    return table
    
}




function setDifference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

function getLegit(table, current) {
    let legit = new Set( Array(WIDTH*WIDTH).fill(true).map( (v,i) => i+1) ) // [1,2,3,4]

    // same col
    for (let i = 0; i<current.y; i++) {
        legit.delete( table[i][current.x].value )
    }

    // same row
    for (let i = 0; i<current.x; i++) {
        legit.delete( table[current.y][i].value )
    }

    // same block
    let blockStart = {
        x: current.x - current.x % WIDTH,
        y: current.y - current.y % WIDTH
    }

    blockLabel:
    for (let y = blockStart.y; y<blockStart.y+WIDTH; y++) {
        for (let x = blockStart.x; x<blockStart.x+WIDTH; x++) {
            if (x === current.x && y === current.y) break blockLabel

            legit.delete( table[y][x].value )
        }
    }

    return legit
}




function randomBetween( from, toExcl) {
    return Math.floor( Math.random() * (toExcl - from) + from)
}

function pickOneFrom(...arr) {
    return arr[ randomBetween(0, arr.length) ]
}

function removeNums( table, nums, except ) {

    let numsRemoved = 0

    while( numsRemoved !== nums) {
        let x = randomBetween(0, WIDTH*WIDTH)
        let y = randomBetween(0, WIDTH*WIDTH)

        let cell = table[y][x]
        if ( !cell.value ) continue

        if ( except.filter(i => i.x === x && i.y === y).length ) continue

        cell.value = 0
        numsRemoved++
    }

    return table
}

// group: 'row', 'column', 'block'
function findCounterparts( table, x, y) {
    let counterparts = { row: null, column: null, block: null}

    // row
    for (let i = 0; i<WIDTH*WIDTH; i++) {
        if ( i === x) continue
        if ( table[y][i].value === table[y][x].value ) {
            counterparts.row = { x: i, y }
            break
        }
    }

    // column
    for (let i = 0; i<WIDTH*WIDTH; i++) {
        if ( i === y) continue
        if ( table[i][x].value === table[y][x].value ) {
            counterparts.column = { x, y: i }
            break
        }
    }

    // block
    let blockStart = {
        x: x - x % WIDTH,
        y: y - y % WIDTH
    }

    blockLabel:
    for (let i = blockStart.y; i<blockStart.y+WIDTH; i++) {
        for (let j = blockStart.x; j<blockStart.x+WIDTH; j++) {
            if ( i === y && j === x) continue
            if ( table[i][j].value === table[y][x].value ) {
                counterparts.block = { x: j, y: i}
                break blockLabel
            }
        }
    }

    return counterparts
}

function generateCorruptedTable( nRemove ) {
    let table = generateFilledTable()
    let cell = {
        x: randomBetween(0,WIDTH*WIDTH),
        y: randomBetween(0,WIDTH*WIDTH)
    }

    let newVal
    do {
        newVal = randomBetween(1,WIDTH*WIDTH+1)
    } while ( newVal === table[cell.y][cell.x].value )

    table[cell.y][cell.x].value = newVal

    let counterparts = findCounterparts(table, cell.x, cell.y)
    let remained = pickOneFrom('row', 'column', 'block')

    for (let cp = 0; cp<counterparts.length; cp++) {
        if (cp !== remained
            && counterparts[cp].x !== counterparts[remained].x
            && counterparts[cp].y !== counterparts[remained].y
            ) {
            table[ counterparts[cp].y ][ counterparts[cp].x ].value = 0
        }
    }

    return removeNums( table, nRemove, [cell, counterparts[remained] ])
}


function tableToTape (table) {
    let tape = {}
    for (let x = 0; x<WIDTH*WIDTH; x++) {
        for (let y = 0; y<WIDTH*WIDTH; y++) {

            let dx = Math.floor( x/WIDTH )
            let dy = Math.floor( y/WIDTH )
            tape[`${x+dx} ${y+dy}`] = table[y][x].value ? table[y][x].value.toString() : '.'
        }
    }

    return tape
}

module.exports = function sudoku() {
    let tests = []

    for (let i = 0; i<100; i++) {
    
        let table, test = {}
    
        if ( randomBetween(0,2) ) {
            table = generateCorruptedTable( randomBetween(8,12) ) // if width=3, randomBetween(50,70)
            test.expected = false
        }
        else {
            table = removeNums( generateFilledTable(), randomBetween(8,12), [])
            test.expected = true
        }
    
        test.tape = tableToTape( table )
    
        tests.push(test)
    }
    
    return tests
}

