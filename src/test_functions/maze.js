
function generateEmptyGame(a) {
    if (a < 3) throw new Error('Too small map')

    // map cells: 'b' barrier, 'w' wall, 'u' unvisited 'v' visited
    let map = Array(2*a+1).fill(true).map( (r,ri) => {
        return Array(2*a+1).fill('').map( (c,ci) => {
            if (ri === 0 || ri === 2*a ) return 'b'
            if (ci === 0 || ci === 2*a ) return 'b'
            if (ci % 2 === 0) return 'w'
            if (ri % 2 === 0) return 'w'
            return 'u'
        })
    })

    let startingPoint = {
        x: 2*randomBetween(0,a) + 1,
        y: 2*randomBetween(0,a) + 1,
        iteration: 1
    }

    map[startingPoint.y][startingPoint.x] = 'v'

    return {
        map,
        visited: [startingPoint]
    }
}


function pickOneFrom(...arr) {
    return arr[ randomBetween(0, arr.length) ]
}

function randomBetween( from, toExcl) {
    return Math.floor( Math.random() * (toExcl - from) + from)
}

function drawMap(map) {
    for (let y = 0; y<map.length; y++) {
        let row = ''
        for (let x = 0; x<map[0].length; x++) {
            switch (map[y][x]) {
                case 'b':
                    row += '#'
                    break
                case 'w':
                    row += 'O'
                    break
                case 'v':
                    row += ' '
                    break
                case 'u':
                    row += '.'
                    break
            }
            row += ' '
        }
        console.log(row)
    }
}

function getPossibleMoves(game) {
    let map = game.map
    let pts = game.visited
    let moves = [] // { fromX, fromY, toX, toY, iteration (of prev)}

    for (let i = 0; i<pts.length; i++) {
        let p = pts[i]
        // up
        if ( map[p.y-1][p.x] === 'w' && map[p.y-2][p.x] === 'u') {
            moves.push({ fromX: p.x, fromY: p.y, toX: p.x, toY: p.y-2, iteration: p.iteration })
        }

        // down
        if ( map[p.y+1][p.x] === 'w' && map[p.y+2][p.x] === 'u') {
            moves.push({ fromX: p.x, fromY: p.y, toX: p.x, toY: p.y+2 , iteration: p.iteration})
        }

        // left
        if ( map[p.y][p.x-1] === 'w' && map[p.y][p.x-2] === 'u') {
            moves.push({ fromX: p.x, fromY: p.y, toX: p.x-2, toY: p.y, iteration: p.iteration })
        }

        // right
        if ( map[p.y][p.x+1] === 'w' && map[p.y][p.x+2] === 'u') {
            moves.push({ fromX: p.x, fromY: p.y, toX: p.x+2, toY: p.y, iteration: p.iteration })
        }
    }

    return moves
}

function carveWall(game) {
    let result = {} // successful: bool

    let moves = getPossibleMoves(game)
    if ( !moves.length ) return { successful: false}

    let selected = moves[ randomBetween(0, moves.length) ]

    let intermPt = {
        x: selected.fromX + ( selected.toX - selected.fromX ) /2,
        y: selected.fromY + ( selected.toY - selected.fromY ) /2,
        iteration: selected.iteration+1
    }

    game.map[intermPt.y][intermPt.x] = 'v'
    game.visited.push( intermPt)

    game.map[selected.toY][selected.toX] = 'v'
    game.visited.push({ x: selected.toX, y: selected.toY, iteration: selected.iteration+2 })

    return {successful: true}
}

function findSolution(game) {
    let fromStart = [], fromEnd = [] // assuming start always 1,1, end always 2n,2n
    let a = game.map.length

    let all = game.visited

    // find 1,1
    for (let i = 0; i<all.length; i++) {
        if ( all[i].x === 1 && all[i].y === 1) {
            fromStart.push( all[i] )
            break
        }
    }

    // find 2n,2n
    for (let i = 0; i<all.length; i++) {
        if ( all[i].x === a-2 && all[i].y === a-2) {
            fromEnd.push( all[i] )
            break
        }
    }

    let longerOne = fromStart[0].iteration > fromEnd[0].iteration ? fromStart : fromEnd

    while ( fromStart[ fromStart.length-1 ].iteration !== fromEnd[ fromEnd.length-1 ].iteration ) {
        longerOne.push( findPrevious(all,
            longerOne[ longerOne.length-1 ].x,
            longerOne[ longerOne.length-1 ].y,
            longerOne[ longerOne.length-1 ].iteration)
    )

    }
    
    
    while ( fromStart[ fromStart.length-1 ].x !== fromEnd[ fromEnd.length-1 ].x 
        || fromStart[ fromStart.length-1 ].y !== fromEnd[ fromEnd.length-1 ].y ) {
            
            fromStart.push(
                findPrevious(all,
                    fromStart[ fromStart.length-1 ].x,
                    fromStart[ fromStart.length-1 ].y,
                    fromStart[ fromStart.length-1 ].iteration)
            )

            fromEnd.push(
                findPrevious(all,
                    fromEnd[ fromEnd.length-1 ].x,
                    fromEnd[ fromEnd.length-1 ].y,
                    fromEnd[ fromEnd.length-1 ].iteration)
            )
    
    }

    fromEnd.pop()
    fromEnd.reverse()

    return [ ...fromStart, ...fromEnd]
    

}


function findPrevious (arr, x, y, iteration) {

    let distance = (x1, x2, y1, y2) => Math.abs(y2-y1) + Math.abs(x2-x1)

    for (let i = 0; i< arr.length; i++) {
        if ( distance(x, arr[i].x, y, arr[i].y) === 1 && iteration - arr[i].iteration === 1) {
            return arr[i]
        }
    }
}

function generateValidMaze() {

    let game = generateEmptyGame( randomBetween(7, 8) )
    let result
    do {
        result = carveWall(game)
    } while( result.successful )

    return game
    
}

function generateInvalidMaze() {
    let game = generateValidMaze()
    let solution = findSolution(game)

    let blockedInd = Math.floor( solution.length/2 )
    if (blockedInd % 2 === 0) blockedInd++

    game.map[ solution[blockedInd].y][solution[blockedInd].x] = 'w'
    return game
}



module.exports = function maze() {

    let tests = []
    let mapSymbolToTapeSymbol = s => {
        if (s === 'b') return 'O'
        if (s === 'w') return 'O'
        else return undefined
    }

    // valid
    for (let i = 0; i<50; i++) {
        let test = { expected: true, tape: {}}
        let map = generateValidMaze().map

        for (let y = 0; y<map.length; y++) {
            for (let x = 0; x<map[0].length; x++) {
                let symbol = mapSymbolToTapeSymbol( map[y][x] )

                if (symbol) {
                    test.tape[`${x-1} ${y-1}`] = symbol
                }
            }
        }

        test.tape[`${map.length-3} ${map.length-3}`] = 'X'

        tests.push( test )
    }

    // invalid
    for (let i = 0; i<50; i++) {
        let test = { expected: false, tape: {}}
        let map = generateInvalidMaze().map

        for (let y = 0; y<map.length; y++) {
            for (let x = 0; x<map[0].length; x++) {
                let symbol = mapSymbolToTapeSymbol( map[y][x] )

                if (symbol) {
                    test.tape[`${x-1} ${y-1}`] = symbol
                }
            }
        }

        test.tape[`${map.length-3} ${map.length-3}`] = 'X'

        tests.push( test )
    }

    return tests
}

// console.log( module.exports()[0] )