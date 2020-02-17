
function generateInstruction() {
    let instruction = []

    instruction[0] = pickOneFrom('a','b','c','d','e','f','g','h','i')
    instruction[1] = pickOneFrom('_', '0', '1')
    instruction[2] = pickOneFrom('a','b','c','d','e','f','g','h')
    instruction[3] = pickOneFrom('_', '0', '1')
    instruction[4] = pickOneFrom('R', 'R', 'L')

    return instruction
}

function pickOneFrom(...arr) {
    return arr[ randomBetween(0, arr.length) ]
}

function randomBetween( from, toExcl) {
    return Math.floor( Math.random() * (toExcl - from) + from)
}


function generateMap( len ) {
    let generated = 0
    let map = {}

    while (generated !== len) {
        let instruction = generateInstruction()

        if ( !map[`${instruction[0]} ${instruction[1]}`] ) {
            map[`${instruction[0]} ${instruction[1]}`] = instruction
            generated++
        }
        
    }

    return map
}

function generateTape( len ) {
    let tape = {}

    for (let i = 0; i<len; i++ ) {
        tape[`${i} ${0}`] = pickOneFrom('0', '1')
    }

    return tape
}

function getNextProduction(tm, prodMap, tape, currentState) {
    let currentSymbol = tape[`${tm.x} ${tm.y}`] || '_'
    let nextProd
    if ( currentState === 'a') {
        nextProd = ['a', currentSymbol, 'a', currentSymbol, 'R']
    }
    else if (prodMap[`${currentState} ${currentSymbol}`]) {
        nextProd = prodMap[`${currentState} ${currentSymbol}`]
    }
    else {
        nextProd = [currentState, currentSymbol, 'r', currentSymbol, 'R']
    }

    return nextProd
}

function simulate(prodMap, tape ) {

    let status = 'working' // accepted, rejected
    let iteration = 0
    let currentState = 'i'
    let tm = {x: 0, y: 0}

    while ( iteration !== 20) {

        let nextProd = getNextProduction(tm, prodMap, tape, currentState)
        
        currentState = nextProd[2]
    
        if (currentState === 'a') {
            status = 'accepted'
            break
        }

        if (currentState === 'r') {
            status = 'rejected'
            break
        }

        let key = `${tm.x} ${tm.y}`
        if (nextProd[3] === '_') {
            delete tape[key]
        }
        else {
            tape[key] = nextProd[3]
        }
        
        switch( nextProd[4] ) {
            case 'R':
                tm.x++
                break
            case 'L':
                tm.x--
                break
        }

        iteration++
    }

    return {status, iteration}
    
}

module.exports = function turing () {

    let tests = []
    let acceptedCount = 0

    while ( tests.length !== 100 ) {

        let prodMap = generateMap( randomBetween(15, 21) )
        let tape = generateTape( randomBetween(4,9) )

        let test = {
            tape: { ...tape }
        }

        let status = simulate( prodMap, tape)

        if (status.iteration < 5 || status.iteration > 15) {
            continue
        }

        test.expected = status.status === 'accepted' ? true : false

        // if rejected and rejectedOnes > 50, restart
        if ( !test.expected && tests.length - acceptedCount > 50 ) {
            continue
        }

        if ( test.expected) {
            acceptedCount++
        }

        let currentRow = 1
        Object.values( prodMap ).forEach( instruction => {
            for ( let i = 0; i<5; i++) {
                if ( instruction[i] !== '_') {
                    test.tape[`${i} ${currentRow}`] = instruction[i]
                }
            }

            currentRow++
        })
        

        tests.push(test)
    }

    return tests
}

