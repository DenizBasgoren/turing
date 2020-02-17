
module.exports = function chess() {
    let tests = []

    for (let i = 0; i<100; i++) {
        let b = getRandomBoard( randomBetween(3,9), randomBetween(3,9) )
    
        let test = {tape: {}, expected: !!b.whiteIsChecked }
    
        for ( let y = 0; y<8; y++) {
            for (let x = 0; x<8; x++) {
                test.tape[`${x} ${y}`] = b.board[y][x] || '.'
            }
        }
    
        tests.push( test )
    }

    return tests
}


function newBoard(copyFrom) {
    let arr = Array(8).fill('').map(row => {
        return new Proxy( Array(8).fill('') , {
            get(target, prop) {
                if (prop >= 0 && prop < 8) {
                    return target[prop]
                }
                else return ''
            },
            set(target, prop, val) {
                if (prop >= 0 && prop < 8) {
                    target[prop] = val
                }
            }
        })
    })

    let p = new Proxy( arr, {
        get(target,prop) {
            if (prop >= 0 && prop < 8) {
                return target[prop]
            }
            else {
                return new Proxy( [], {
                    get(target,prop) {
                        return ''
                    },
                    set(target,prop,val) {
                        return
                    }
                })
            }
        }
    })

    if (copyFrom) {
        for (let i = 0; i<8; i++) {
            for (let j = 0; j<8; j++) {
                p[i][j] = copyFrom[i][j]
            }
        }
    }

    return p
}


function getRandomCell() {
    return [randomBetween(0,8), randomBetween(0,8) ]
}

function pickOneFrom(...arr) {
    return arr[ randomBetween(0, arr.length) ]
}

function randomBetween( from, toExcl) {
    return Math.floor( Math.random() * (toExcl - from) + from)
}

function sideOf (piece) {
    if ( !piece ) return ''
    else return piece.charCodeAt() > 96 ? 'black' : 'white'
}

function getThreatenedCells (board, x, y) {
    
    let attacker = board[y][x]
    if ( !attacker ) throw new Error ('No attacker piece found on given coords')
    let attackerSide = sideOf(attacker)

    let attackerType = attacker.toLowerCase()
    let mask = newBoard()

    let cx,cy

    if (attackerType === 'p') {
            if (attackerSide === 'black') {
                [-1,1].forEach(i => {
                    let targetSide = sideOf(board[y+1][x+i])
                    if (targetSide !== attackerSide) {
                        mask[y+1][x+i] = true
                    }
                })
            }
            else {
                [-1,1].forEach(i => {
                    let targetSide = sideOf(board[y-1][x+i])
                    if (targetSide !== attackerSide) {
                        mask[y-1][x+i] = true
                    }
                })
            }
    }

    if (attackerType === 'r' || attackerType === 'q') {
        cx = x+1
        cy = y
        while (cx < 8) {
            let targetSide = sideOf(board[cy][cx])
            if ( targetSide === '' ) {
                mask[cy][cx] = true
            }
            else if (targetSide === attackerSide) {
                break
            }
            else {
                mask[cy][cx] = true
                break
            }
            cx++
        }

        cx = x-1
        cy = y
        while (cx >= 0) {
            let targetSide = sideOf(board[cy][cx])
            if ( targetSide === '' ) {
                mask[cy][cx] = true
            }
            else if (targetSide === attackerSide) {
                break
            }
            else {
                mask[cy][cx] = true
                break
            }
            cx--
        }

        cx = x
        cy = y+1
        while (cy < 8) {
            let targetSide = sideOf(board[cy][cx])
            if ( targetSide === '' ) {
                mask[cy][cx] = true
            }
            else if (targetSide === attackerSide) {
                break
            }
            else {
                mask[cy][cx] = true
                break
            }
            cy++
        }

        cx = x
        cy = y-1
        while (cy >= 0) {
            let targetSide = sideOf(board[cy][cx])
            if ( targetSide === '' ) {
                mask[cy][cx] = true
            }
            else if (targetSide === attackerSide) {
                break
            }
            else {
                mask[cy][cx] = true
                break
            }
            cy--
        }
    }


    if (attackerType === 'b' || attackerType === 'q') {
        cx = x+1
        cy = y+1
        while (cx < 8 && cy < 8) {
            let targetSide = sideOf(board[cy][cx])
            if ( targetSide === '' ) {
                mask[cy][cx] = true
            }
            else if (targetSide === attackerSide) {
                break
            }
            else {
                mask[cy][cx] = true
                break
            }
            cx++
            cy++
        }

        cx = x+1
        cy = y-1
        while (cx < 8 && cy >= 0) {
            let targetSide = sideOf(board[cy][cx])
            if ( targetSide === '' ) {
                mask[cy][cx] = true
            }
            else if (targetSide === attackerSide) {
                break
            }
            else {
                mask[cy][cx] = true
                break
            }
            cx++
            cy--
        }

        cx = x-1
        cy = y+1
        while (cx >= 0 && cy < 8) {
            let targetSide = sideOf(board[cy][cx])
            if ( targetSide === '' ) {
                mask[cy][cx] = true
            }
            else if (targetSide === attackerSide) {
                break
            }
            else {
                mask[cy][cx] = true
                break
            }
            cx--
            cy++
        }

        cx = x-1
        cy = y-1
        while (cx >= 0 && cy >= 0) {
            let targetSide = sideOf(board[cy][cx])
            if ( targetSide === '' ) {
                mask[cy][cx] = true
            }
            else if (targetSide === attackerSide) {
                break
            }
            else {
                mask[cy][cx] = true
                break
            }
            cx--
            cy--
        }
    }

    if (attackerType === 'n') {
        [-2,-1,1,2].forEach(i => {
            [-2,-1,1,2].forEach(j => {
                if ( Math.abs(i) === Math.abs(j)) return

                let targetSide = sideOf(board[y+i][x+j])
                if ( targetSide !== attackerSide ) {
                    mask[y+i][x+j] = true
                }
            })
        })
    }
        
    if (attackerType === 'k') {
        [-1,0,1].forEach(i => {
            [-1,0,1].forEach(j => {
                if (i===0 && j===0) return

                let targetSide = sideOf(board[y+i][x+j])
                if ( targetSide !== attackerSide ) {
                    mask[y+i][x+j] = true
                }
            })
        })
    }

    return mask
}


function getRandomBoard ( nBlacks, nWhites ) {

    let board, whiteKingX, whiteKingY, whiteIsChecked


    boardIsLegit:
    while (true) {

        whiteIsChecked = false
        board = newBoard()

        let listOfWhites = [], listOfBlacks = []

        let [blackKingX, blackKingY] = getRandomCell()
        board[blackKingY][blackKingX] = 'k'
        listOfBlacks.push([blackKingX, blackKingY])
        
        do {
            [whiteKingX, whiteKingY] = getRandomCell()
        } while ( Math.abs(blackKingX-whiteKingX) < 2 && Math.abs(blackKingY-whiteKingY) < 2)
        board[whiteKingY][whiteKingX] = 'K'
        listOfWhites.push([whiteKingX, whiteKingY])
        
        
        let piecesPlaced = 0, piecesTotal = nWhites
        
        // placing white pieces
        while ( piecesPlaced !== piecesTotal ) {
        
            // find a new place
            let [x, y] = getRandomCell()
        
            // not empty?
            if ( board[y][x] !== '' ) continue
        
            // place
            board[y][x] = pickOneFrom('R', 'N', 'B', 'Q', 'P')
            listOfWhites.push([x, y])
            piecesPlaced++
        }
    
        piecesPlaced = 0
        piecesTotal = nBlacks
        
        // placing black pieces
        while ( piecesPlaced !== piecesTotal ) {
        
            // find a new place
            let [x, y] = getRandomCell()
        
            // not empty?
            if ( board[y][x] !== '' ) continue
        
            // place
            board[y][x] = pickOneFrom('r', 'n', 'b', 'q', 'p')
            listOfBlacks.push([x, y])
            piecesPlaced++
        }

        let totalChecks = 0
        
        for (let i = 0; i< listOfWhites.length; i++) {
            if ( getThreatenedCells(board, listOfWhites[i][0], listOfWhites[i][1])[blackKingY][blackKingX] ) {
                totalChecks++

                if (totalChecks > 1) {
                    continue boardIsLegit
                }
            }
        }

        for (let i = 0; i< listOfBlacks.length; i++) {
            if ( getThreatenedCells(board, listOfBlacks[i][0], listOfBlacks[i][1])[whiteKingY][whiteKingX] ) {
                totalChecks++
                whiteIsChecked = true

                if (totalChecks > 1) {
                    continue boardIsLegit
                }

            }
        }

        break
    }

    return { board, whiteIsChecked }
}
