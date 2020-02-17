


function goForward(current) {
    if (current.x === 8) {
        current.x = 0
        current.y++
    }
    else {
        current.x++
    }
}

function goBackWard(current) {
    if (current.x === 0) {
        current.x = 8
        current.y--
    }
    else {
        current.x--
    }
}

function doneAll(current) {
    return current.y === 9
}


function generateFilledTable() {
    let table = [
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','','']
    ]
    
    for (let i = 0; i<9; i++) {
        for (let j = 0; j<9; j++) {
            table[i][j] = {
                value: 0,
                notAllowed: new Set()
            }
        }
    }
    
    let current = {y: 0, x: 0}
    
    while (true) {

        if ( doneAll(current) ) {
            // drawTable()
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
    let legit = new Set([1,2,3,4,5,6,7,8,9])

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
        x: current.x - current.x % 3,
        y: current.y - current.y % 3
    }

    blockLabel:
    for (let y = blockStart.y; y<blockStart.y+3; y++) {
        for (let x = blockStart.x; x<blockStart.x+3; x++) {
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

function drawTable(table) {
    for (let i = 0; i<9; i++) {
        if (i === 3 || i === 6) console.log('- - - - - - - - - - -')
        let row = ''
        for (let j = 0; j<9; j++) {

            if (j === 3 || j === 6) row += '| '
            row += String( table[i][j].value || ' ' )
            row += ' '
        }
        console.log(row)
    }
}

function removeNums( table, nums, except ) {

    let numsRemoved = 0

    while( numsRemoved !== nums) {
        let x = randomBetween(0, 9)
        let y = randomBetween(0, 9)

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
    for (let i = 0; i<9; i++) {
        if ( i === x) continue
        if ( table[y][i].value === table[y][x].value ) {
            counterparts.row = { x: i, y }
            break
        }
    }

    // column
    for (let i = 0; i<9; i++) {
        if ( i === y) continue
        if ( table[i][x].value === table[y][x].value ) {
            counterparts.column = { x, y: i }
            break
        }
    }

    // block
    let blockStart = {
        x: x - x % 3,
        y: y - y % 3
    }

    blockLabel:
    for (let i = blockStart.y; i<blockStart.y+3; i++) {
        for (let j = blockStart.x; j<blockStart.x+3; j++) {
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
        x: randomBetween(0,9),
        y: randomBetween(0,9)
    }

    let newVal
    do {
        newVal = randomBetween(1,10)
    } while ( newVal === table[cell.y][cell.x].value )

    table[cell.y][cell.x].value = newVal

    let counterparts = findCounterparts(table, cell.x, cell.y)
    let remained = pickOneFrom('row', 'column', 'block')

    for (let cp in counterparts) {
        if (cp !== remained
            && counterparts[cp].x !== counterparts[remained].x
            && counterparts[cp].y !== counterparts[remained].y
            ) {
            table[ counterparts[cp].y ][ counterparts[cp].x ].value = 0
        }
    }

    return removeNums( table, nRemove, [cell, counterparts[remained] ])
}



// drawTable( generateCorruptedTable( randomBetween(50,70) ) )


function tableToTape (table) {
    let tape = {}
    for (let x = 0; x<9; x++) {
        for (let y = 0; y<9; y++) {

            let dx = Math.floor( x/3 )
            let dy = Math.floor( y/3 )
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
            table = generateCorruptedTable( randomBetween(50,70) )
            test.expected = false
        }
        else {
            table = removeNums( generateFilledTable(), randomBetween(50,70), [])
            test.expected = true
        }
    
        test.tape = tableToTape( table )
    
        tests.push(test)
    }
    
    return tests
}

