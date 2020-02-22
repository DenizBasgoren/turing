
import {useContext, useEffect, useRef, useState} from 'preact/hooks'
import {render, h, Fragment} from 'preact'
import {context, levelCount} from '../utils/init'
import InputManager from './InputManager'
import Markdown from '../components/Markdown'
import TestManager from './TestManager'
import Tape from '../components/Tape'
// import sampleFields from '../utils/sampleInputs'

// +href[1] is the first capturing group of the passed regex, which is the level number
export default function LevelPage({href}) {
    let [g,gg] = useContext(context)
    let [sampleTest, setSampleTest] = useState( { tape: {}, expected: '...' })
    let tapeContainer = useRef()
    let levelNo = +href[1]

    useEffect(() => {

        if( levelNo > levelCount) return
        document.title = g.text[levelNo]
        
    }, [levelNo, g.languageUpdateNeeded])

    if( levelNo > levelCount) {
        return null
    }

    return <div className="LevelPage" ref={tapeContainer} >
        <InputManager levelNo={levelNo} />
        <Markdown text={g.text[levelNo+74]} />

        <div>
            <h1> {g.text[49]} </h1>
            <Tape
                resetFlag={false}
                widthInPixels={tapeContainer.current && tapeContainer.current.clientWidth /1.2 || 0}
                x={0}
                y={0}
                xprev={0}
                yprev={0}
                // tape={sampleFields[levelNo-1]}
                tape={sampleTest.tape}
            />
            <p> {g.text[38]}: {sampleTest.expected ? g.text[39] : g.text[40]} </p>
        </div>

        <TestManager
            levelNo={levelNo}
            onTestsReady={setSampleTest}
            />
    </div>    
}
