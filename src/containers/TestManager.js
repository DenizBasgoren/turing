
import {useState, useContext, useEffect} from 'preact/hooks'
import {render, h, Fragment} from 'preact'
import { produce } from 'immer'
import {context} from '../utils/init'
import test_functions from '../test_functions/index'
import prod from '../utils/productions'
import Interval from '../components/Interval'
import TestInstance from '../components/TestInstance'




export default function TestManager({levelNo, onTestsReady}) {
    let [g,gg] = useContext(context)
    let [testResults, setTestResults] = useState([]) // signature [Boolean]
    let [tests, setTests] = useState([]) // signature [Test] (see main.js)
    let [testerStatus, setTesterStatus] = useState(0) // 0=didnt start 1=running 2=paused 3=ended
    let [resetAllCommand, setResetAllCommand] = useState(false)
    let [nextCommand, setNextCommand] = useState(false)
     
    // uncomment for debugging
    // useEffect(() => {
    //     window._ts = testerStatus
    //     window._tr = testResults
    // })

    useEffect(() => {
        let tests = test_functions[levelNo-1]().shuffle()
        setTests( tests )
        onTestsReady( tests[0] )
    }, [levelNo])

    useEffect(() => {
        // skip initial condition where tests = []
        if (!tests.length) return

        let allRight = true
        let allFinished = true
        let allUndefined = true
        for (let i = 0; i<tests.length; i++) {
            if (testResults[i] === undefined) {
                allFinished = false
                allRight = false
            }
            else if (testResults[i] === true) {
                allUndefined = false
            }
            else if (testResults[i] === false) {
                allRight = false
                allUndefined = false
            }
        }

        // level up
        if (allRight) {
            gg( prod.levelComplete(levelNo) )
        }

        // stop interval
        if (allFinished) {
            setTesterStatus(3)
        }

        // reset after automatic tester finishes
        if (testerStatus === 3 && allUndefined) {
            setTesterStatus(0)
        }

    }, [testResults])

    useEffect(() => {
        setResetAllCommand(true)
    }, [g.prodMap, levelNo, g.initialState])


    // suppress flags
    useEffect(() => {
        if (resetAllCommand) {
            setResetAllCommand(false)
        }
        if (nextCommand) {
            setNextCommand(false)
        }

    }, [resetAllCommand, nextCommand])


    let correctAnswersLen = testResults.filter(t => t === true).length
    let incorrectAnswersLen = testResults.filter(t => t === false).length

    return g.errorMsgInd
        ? <span className='TestManager red'>
            {g.text[24]}
        </span>
        : <>
            <section className='TestManager'>
                <button
                    onClick={handleRun}
                    className={testerStatus === 3 && 'disabled'}
                >
                    {
                        testerStatus === 0 ? g.text[25] : (
                            testerStatus === 1 ? g.text[26] : g.text[27]
                        )
                    }
                </button>
                <button onClick={handleReset}>
                    {g.text[28]}
                </button>
                {
                    testerStatus === 1 && <>
                        <Interval callback={handleInterval} delay={1} />
                        <p> {g.text[29]} </p>
                    </>
                }
                <p
                    className={ correctAnswersLen === tests.length && 'green' }
                >
                    {g.text[30]} {correctAnswersLen} / {tests.length}
                </p>
                <p
                    className={ correctAnswersLen === tests.length && 'green' }
                >
                    {g.text[31]} {incorrectAnswersLen} / {tests.length}
                </p>
            </section>
            {
                tests.map((t,i) => <TestInstance
                    text={g.text}
                    prodMap={g.prodMap}
                    initialTape={t.tape}
                    initialState={g.initialState}
                    expected={t.expected}
                    number={i+1}
                    nextFlag={nextCommand}
                    resetFlag={resetAllCommand}
                    onEnd={handleEnd.bind(this, i)}
                    key={i}
                />)
            }
        </>

    function handleEnd (ind, result) {
        setTestResults( produce( s => {
            s[ind] = result // true, false, undefined (test ongoing)
        }))
    }

    // Math.random( ) is pretty likely to be different on every call, so command will trigger onEffect on targets
    function handleInterval() {
        setNextCommand( Math.random() )
    }

    function handleRun() {
        if (testerStatus === 0) setTesterStatus(1)
        else if (testerStatus === 1) setTesterStatus(2)
        else if (testerStatus === 2) setTesterStatus(1)
    }

    function handleReset() {
        setResetAllCommand(true)
        if (testerStatus === 1 || testerStatus === 2) setTesterStatus(0)
    }
}
