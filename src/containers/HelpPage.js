
import {useState, useRef, useEffect, useContext} from 'preact/hooks'
import {render, h, Fragment} from 'preact'
import {context} from '../utils/init'
import prod from '../utils/productions'
import Interval from '../components/Interval'
import Markdown from '../components/Markdown'
import Input from '../components/Input'
import Tape from '../components/Tape'
import TestInstance from '../components/TestInstance'
import ScrollToTop from '../components/ScrollToTop'



////////
export default function HelpPage() {
    let [g,gg] = useContext(context)
    let [counter, setCounter] = useState(0)
    let tapeContainer = useRef(null)
    // counter counts from 0 to inf. it is for animating tapes on this page

    useEffect(() => {
        document.title = g.text[0]
    }, [g.languageUpdateNeeded])

    return <div
        className="HelpPage"
        ref={tapeContainer}
    >
        <Interval callback={() => setCounter(counter+1)} delay={1000} />
        <Markdown text={g.text[50]} />
        
        <Input
            text={g.text}
            isEditable={false}
            raw={`
                i X m X R
                i _ m X N
                m X m X R
                m _ m X R
                m Y ACCEPT _ N
            `}
        />

        <Markdown text={g.text[51]} />

        <section>
            <Tape
                resetFlag={false}
                widthInPixels={tapeContainer.current && tapeContainer.current.clientWidth /1.2 || 0}
                x={[0,-1,-2,-1,0,1,2,1][counter % 8]}
                y={0}
                xprev={[1,0,-1,-2,-1,0,1,2][counter % 8]}
                yprev={0}
                tape={{
                    '2 0' : 'B',
                    '-2 0' : 'A'
                }}
            />
        </section>

        <Markdown text={g.text[52]} />

        <section>
            <Tape
                resetFlag={false}
                widthInPixels={tapeContainer.current && tapeContainer.current.clientWidth /1.2 || 0}
                x={[0,-1,-2,-1,0,1,2,1][counter % 8]}
                y={0}
                xprev={[1,0,-1,-2,-1,0,1,2][counter % 8]}
                yprev={0}
                tape={{
                    '2 0' : ['B','B','B','B','B','B','B','A','A','A','A','A','A','A','A','B'][counter % 16],
                    '-2 0' : ['A','A','A','B','B','B','B','B','B','B','B','A','A','A','A','A'][counter % 16]
                }}
            />
        </section>


        <Markdown text={g.text[53]} />
        
        <section>
            <Tape
                resetFlag={false}
                widthInPixels={tapeContainer.current && tapeContainer.current.clientWidth /1.2 || 0}
                x={0}
                y={[-1,0,1,2,2,2,1,0,-1,-2,-2,-2][counter % 12]}
                xprev={0}
                yprev={[-2,-1,0,1,2,2,2,1,0,-1,-2,-2][counter % 12]}
                tape={{
                    '0 -1' : ['','X','X','X','X','X','X','X','X','','',''][counter % 12],
                    '0 0' : ['','','X','X','X','X','X','X','','','',''][counter % 12],
                    '0 1': ['','','','X','X','X','X','','','','',''][counter % 12]
                }}
            />
        </section>

        <Markdown text={g.text[54]} />
        
        <Input
            text={g.text}
            isEditable={false}
            raw={`
                A 0 B 1 R
            `}
        />

        <Markdown text={g.text[55]} />

        <Input
            text={g.text}
            isEditable={false}
            raw={`
                B 1 A 2 R
                A 2 B 4 U
                A 3 C 1 L
            `}
        />

        <section>
            <Tape
                resetFlag={false}
                widthInPixels={tapeContainer.current && tapeContainer.current.clientWidth /1.2 || 0}
                x={0}
                y={0}
                xprev={0}
                yprev={0}
                tape={{
                    '0 0' : '3',
                    '-1 0' : '2',
                    '-2 0' : '1'
                }}
            />
        </section>

        <Markdown text={g.text[56]} />

        <section>
            <Tape
                resetFlag={false}
                widthInPixels={tapeContainer.current && tapeContainer.current.clientWidth /1.2 || 0}
                x={0}
                y={0}
                xprev={0}
                yprev={0}
                tape={{
                    '2 0' : 'X'
                }}
            />
        </section>

        <Markdown text={g.text[57]} />

        <Input
            text={g.text}
            isEditable={false}
            raw={`
                ${g.text[67]} _ ${g.text[67]} _ R
            `}
        />

        <Markdown text={g.text[58]} />

        <Input
            text={g.text}
            isEditable={false}
            raw={`
                ${g.text[67]} _ ${g.text[67]} _ R
                ${g.text[67]} X ${g.text[68]} X N
            `}
        />

        <Markdown text={g.text[59]} />

        <Input
            text={g.text}
            isEditable={false}
            raw={`
                ${g.text[67]} _ ${g.text[67]} _ R
                ${g.text[67]} X ${g.text[68]} X N
                ${g.text[68]} X ${g.text[68]} X N
            `}
        />

        <Markdown text={g.text[60]} />

        <Input
            text={g.text}
            isEditable={false}
            raw={`
                ${g.text[67]} _ ${g.text[67]} _ R
                ${g.text[67]} X ${g.text[68]} X N
                ${g.text[68]} X ${g.text[68]} X N
            `}
        />

        <Markdown text={g.text[61]} />
        

        <section>
            <Tape
                resetFlag={false}
                widthInPixels={tapeContainer.current && tapeContainer.current.clientWidth /1.2 || 0}
                x={0}
                y={0}
                xprev={0}
                yprev={0}
                tape={{
                    '0 0' : '1',
                    '1 0' : '0',
                    '2 0' : '0',
                    '3 0' : '0'
                }}
            />
        </section>

        <Markdown text={g.text[62]} />

        <Input
            text={g.text}
            isEditable={false}
            raw={`
                ${g.text[69]} ${g.text[72]} ${g.text[69]} ${g.text[72]} R
                ${g.text[69]} _ ${g.text[70]} _ N
                ${g.text[70]} _ ${g.text[71]} _ L
                ${g.text[71]} ${g.text[73]} ACCEPT ${g.text[73]} N
                ${g.text[71]} ${g.text[74]} REJECT ${g.text[74]} N
            `}
        />


        <Markdown text={g.text[63]} />

        <Input
            text={g.text}
            isEditable={false}
            raw={`
                ${g.text[69]} ${g.text[72]} ${g.text[69]} ${g.text[72]} R
                ${g.text[69]} _ ${g.text[71]} _ L
                ${g.text[71]} ${g.text[73]} ACCEPT ${g.text[73]} N
            `}
        />



        <Markdown text={g.text[64]} />

        <Input
            text={g.text}
            isEditable={false}
            raw={`
                ${g.text[69]} 0 ${g.text[69]} 0 R
                ${g.text[69]} 1 ${g.text[69]} 1 R
                ${g.text[69]} 2 ${g.text[69]} 2 R
                ${g.text[69]} 3 ${g.text[69]} 3 R
                ${g.text[69]} 4 ${g.text[69]} 4 R
                ${g.text[69]} 5 ${g.text[69]} 5 R
                ${g.text[69]} 6 ${g.text[69]} 6 R
                ${g.text[69]} 7 ${g.text[69]} 7 R
                ${g.text[69]} 8 ${g.text[69]} 8 R
                ${g.text[69]} 9 ${g.text[69]} 9 R
                ${g.text[69]} _ ${g.text[71]} _ L
                ${g.text[71]} 0 ACCEPT 0 N
                ${g.text[71]} 2 ACCEPT 2 N
                ${g.text[71]} 4 ACCEPT 4 N
                ${g.text[71]} 6 ACCEPT 6 N
                ${g.text[71]} 8 ACCEPT 8 N
            `}
        />


        <Markdown text={g.text[65]} />

        <TestInstance
            text={g.text}
            number={1}
            expected={false}
            initialState={`${g.text[69]}`}
            initialTape={{
                '0 0' : '9',
                '1 0' : '9',
                '2 0' : '9'
            }}
            prodMap={{
                [`${g.text[69]} 1`] : [`${g.text[69]}`, '1', `${g.text[69]}`, '1', 'R'],
                [`${g.text[69]} 2`] : [`${g.text[69]}`, '2', `${g.text[69]}`, '2', 'R'],
                [`${g.text[69]} 3`] : [`${g.text[69]}`, '3', `${g.text[69]}`, '3', 'R'],
                [`${g.text[69]} 4`] : [`${g.text[69]}`, '4', `${g.text[69]}`, '4', 'R'],
                [`${g.text[69]} 5`] : [`${g.text[69]}`, '5', `${g.text[69]}`, '5', 'R'],
                [`${g.text[69]} 6`] : [`${g.text[69]}`, '6', `${g.text[69]}`, '6', 'R'],
                [`${g.text[69]} 7`] : [`${g.text[69]}`, '7', `${g.text[69]}`, '7', 'R'],
                [`${g.text[69]} 8`] : [`${g.text[69]}`, '8', `${g.text[69]}`, '8', 'R'],
                [`${g.text[69]} 9`] : [`${g.text[69]}`, '9', `${g.text[69]}`, '9', 'R'],
                [`${g.text[69]} 0`] : [`${g.text[69]}`, '0', `${g.text[69]}`, '0', 'R'],
                [`${g.text[69]} _`] : [`${g.text[69]}`, '_', `${g.text[71]}`, '_', 'L'],
                [`${g.text[71]} 0`] : [`${g.text[71]}`, '0', 'ACCEPT', '0', 'N'],
                [`${g.text[71]} 2`] : [`${g.text[71]}`, '2', 'ACCEPT', '2', 'N'],
                [`${g.text[71]} 4`] : [`${g.text[71]}`, '4', 'ACCEPT', '4', 'N'],
                [`${g.text[71]} 6`] : [`${g.text[71]}`, '6', 'ACCEPT', '6', 'N'],
                [`${g.text[71]} 8`] : [`${g.text[71]}`, '8', 'ACCEPT', '8', 'N']
            }}
        />

        <TestInstance
            text={g.text}
            number={2}
            expected={true}
            initialState={`${g.text[69]}`}
            initialTape={{
                '0 0' : '1',
                '1 0' : '0',
                '2 0' : '0',
                '3 0' : '0'
            }}
            prodMap={{
                [`${g.text[69]} 1`] : [`${g.text[69]}`, '1', `${g.text[69]}`, '1', 'R'],
                [`${g.text[69]} 2`] : [`${g.text[69]}`, '2', `${g.text[69]}`, '2', 'R'],
                [`${g.text[69]} 3`] : [`${g.text[69]}`, '3', `${g.text[69]}`, '3', 'R'],
                [`${g.text[69]} 4`] : [`${g.text[69]}`, '4', `${g.text[69]}`, '4', 'R'],
                [`${g.text[69]} 5`] : [`${g.text[69]}`, '5', `${g.text[69]}`, '5', 'R'],
                [`${g.text[69]} 6`] : [`${g.text[69]}`, '6', `${g.text[69]}`, '6', 'R'],
                [`${g.text[69]} 7`] : [`${g.text[69]}`, '7', `${g.text[69]}`, '7', 'R'],
                [`${g.text[69]} 8`] : [`${g.text[69]}`, '8', `${g.text[69]}`, '8', 'R'],
                [`${g.text[69]} 9`] : [`${g.text[69]}`, '9', `${g.text[69]}`, '9', 'R'],
                [`${g.text[69]} 0`] : [`${g.text[69]}`, '0', `${g.text[69]}`, '0', 'R'],
                [`${g.text[69]} _`] : [`${g.text[69]}`, '_', `${g.text[71]}`, '_', 'L'],
                [`${g.text[71]} 0`] : [`${g.text[71]}`, '0', 'ACCEPT', '0', 'N'],
                [`${g.text[71]} 2`] : [`${g.text[71]}`, '2', 'ACCEPT', '2', 'N'],
                [`${g.text[71]} 4`] : [`${g.text[71]}`, '4', 'ACCEPT', '4', 'N'],
                [`${g.text[71]} 6`] : [`${g.text[71]}`, '6', 'ACCEPT', '6', 'N'],
                [`${g.text[71]} 8`] : [`${g.text[71]}`, '8', 'ACCEPT', '8', 'N']
            }}
        />

        <Markdown text={g.text[66]} />
        
        <ScrollToTop />
    </div>
}
