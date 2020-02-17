

import {useState, useRef, useEffect} from 'preact/hooks'
import {render, h, Fragment} from 'preact'
import { produce } from 'immer'
import Tape from './Tape'



// see main.js for interface descriptions
// see main.js for the pattern of flags-commands
// onEnd -> onEnd( true/false/undefined )
export default function TestInstance ({text, prodMap,initialTape,initialState,expected,number, nextFlag, resetFlag, onEnd}) {
    let [isExpanded, setExpanded] = useState(false)
    let [tape, setTape] = useState(initialTape)
    let [currentState, setCurrentState] = useState(initialState) // ingame state
    let tapeContainer = useRef(null) // to measure width
    let [resetCommand, setResetCommand] = useState(false)
    let [tm, setTm] = useState({x: 0, y: 0, xprev: 0, yprev: 0})

    useEffect(() => {
        next()
    }, [nextFlag])

    useEffect(() => {
        reset()
    }, [resetFlag])

    // suppress flags
    useEffect(() => {
        if (resetCommand) {
            setResetCommand(false)
        }
    }, [resetCommand])

    useEffect(() => {
        if ( currentState === 'ACCEPT' && expected
        || currentState === 'REJECT' && !expected ) {
            onEnd && onEnd(true)
        }
        else if ( currentState === 'ACCEPT' && !expected
        || currentState === 'REJECT' && expected ) {
            onEnd && onEnd(false)
        }
    })

    return <section
        className='TestInstance'
        ref={tapeContainer}
    >    
        <div
            className='header'
            onClick={handleExpand}
        >
            <p
                className={[
                    ( currentState === 'ACCEPT' && expected
                    || currentState === 'REJECT' && !expected ) && 'green',
                    ( currentState === 'ACCEPT' && !expected
                    || currentState === 'REJECT' && expected ) && 'red',
                ].join(' ')}
            >
                {text[32]} {number}
            </p>
        </div>
        
        {
            isExpanded && <>
            <Tape
                tape={tape}
                x={tm.x}
                y={tm.y}
                xprev={tm.xprev}
                yprev={tm.yprev}
                widthInPixels={tapeContainer.current.clientWidth}
                resetFlag={resetCommand}
            />

            <div className="status">
                <div>
                    <button onClick={next}>
                        {text[33]}
                    </button>
                </div>
                <div>
                    <span>{text[35]}</span>
                    <span>{currentState}</span>
                </div>
                <div>
                    <span>{text[36]}</span>
                    <span>
                        {
                            getNextProduction(tm, prodMap, tape, currentState).join(' ')
                        }
                    </span>
                </div>
                <div>
                    <button onClick={reset}>
                        {text[34]}
                    </button>
                </div>
                <div>
                    <span>{text[37]}</span>
                    <span
                        className={[
                            ( currentState === 'ACCEPT' && expected
                            || currentState === 'REJECT' && !expected ) && 'green',
                            ( currentState === 'ACCEPT' && !expected
                            || currentState === 'REJECT' && expected ) && 'red',
                        ].join(' ')}
                    >
                        {
                            currentState === 'ACCEPT'
                            ? text[39]
                            : ( currentState === 'REJECT'
                            ? text[40]
                            : text[41]
                            )
                        }
                    </span>
                </div>
                <div>
                    <span>{text[38]}</span>
                    <span
                        className={[
                            ( currentState === 'ACCEPT' && expected
                            || currentState === 'REJECT' && !expected ) && 'green',
                            ( currentState === 'ACCEPT' && !expected
                            || currentState === 'REJECT' && expected ) && 'red',
                        ].join(' ')}
                    >
                        {expected ? text[39] : text[40]}
                    </span>
                </div>
            </div>
            </>
        }

    </section>

    function next() {

        let nextProd = getNextProduction(tm, prodMap, tape, currentState)
        
        setCurrentState( nextProd[2] )

        setTape( produce(s => {
            let key = `${tm.x} ${tm.y}`
            if (nextProd[3] === '_') {
                delete s[key]
            }
            else {
                s[key] = nextProd[3]
            }
        }))
        
        switch( nextProd[4] ) {
            case 'R':
                setTm({x: tm.x+1, y: tm.y, xprev: tm.x, yprev: tm.y })
                break
            case 'L':
                setTm({x: tm.x-1, y: tm.y, xprev: tm.x, yprev: tm.y })
                break
            case 'U':
                setTm({x: tm.x, y: tm.y-1, xprev: tm.x, yprev: tm.y })
                break
            case 'D':
                setTm({x: tm.x, y: tm.y+1, xprev: tm.x, yprev: tm.y })
                break  
            case 'N':
                setTm({x: tm.x, y: tm.y, xprev: tm.x, yprev: tm.y })
                break
        }
    }

    function reset() {
        setResetCommand(true)
        setCurrentState(initialState)
        setTape(initialTape)
        setTm({x: 0, y: 0, xprev: 0, yprev: 0})
        onEnd && onEnd(undefined)
    }

    function getNextProduction(tm, prodMap, tape, currentState) {
        let currentSymbol = tape[`${tm.x} ${tm.y}`] || '_'
        let nextProd
        if ( currentState === 'ACCEPT') {
            nextProd = ['ACCEPT', currentSymbol, 'ACCEPT', currentSymbol, 'N']
        }
        else if ( currentState === 'REJECT' ) {
            nextProd = ['REJECT', currentSymbol, 'REJECT', currentSymbol, 'N']
        }
        else if (prodMap[`${currentState} ${currentSymbol}`]) {
            nextProd = prodMap[`${currentState} ${currentSymbol}`]
        }
        else {
            nextProd = [currentState, currentSymbol, 'REJECT', currentSymbol, 'N']
        }

        return nextProd
    }

    function handleExpand() {
        setExpanded( !isExpanded )
    }
}