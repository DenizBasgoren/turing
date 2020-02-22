
import {useState, useRef, useEffect} from 'preact/hooks'
import {render, h, Fragment} from 'preact'


// onInput -> onInput(bindings, rawInput)
export default function Input({text, raw, isEditable, errorMsg, onInput}) {
    let [isEditMode, setEditMode] = useState(false)
    let textareaRef = useRef()
    let parsedInput = raw.parseProductions()
    
    useEffect(() => {
        if (isEditMode) {
            textareaRef.current.focus()
        }
    }, [isEditMode])

    return <div className='Input'>
        {
            isEditable ?
                <div className='navbar'>
                    <button className={!isEditMode && 'selected'} onClick={() => setEditMode(false)}>
                        {text[47]}
                    </button>
                    <button className={isEditMode && 'selected'} onClick={() => setEditMode(true)}>
                        {text[48]}
                    </button>
                </div> : null
        }
        
        <div className="errorMessage">
            <p className='red'> {errorMsg} </p>
        </div>
        {
            isEditMode
            ? <textarea
                // onBlur={handleSwitchMode}
                onInput={handleInput}
                cols="25"
                rows="10"
                spellcheck={false}
                ref={textareaRef}
            >
                {raw}
            </textarea>
            : <table>
                <thead>
                    <tr>
                        <td>{text[11]}</td>
                        <td>{text[12]}</td>
                        <td>{text[13]}</td>
                        <td>{text[14]}</td>
                        <td>{text[15]}</td>
                    </tr>
                </thead>
                <tbody className={errorMsg ? 'red' : null}>
                    {
                        parsedInput.map((r,i1) => <tr key={6*i1}>
                            {
                                r.map((c,i2) => <td key={6*i1+i2+1}>
                                    {c}
                                </td>)
                            }
                        </tr>)
                    }
                </tbody>
            </table>
        }   
    </div>



    // triggers on every keystroke
    function handleInput (ev) {
        onInput && onInput( ev.target.value )
    }
}
