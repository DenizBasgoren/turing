

import {useState, useEffect, useContext} from 'preact/hooks'
import {render, h, Fragment} from 'preact'
import {context} from '../utils/init'
import prod from '../utils/productions'
import Input from '../components/Input'


export default function InputManager({levelNo}) {
    let [g,gg] = useContext(context)
    let [raw, setRaw] = useState('')

    useEffect(() => {
        let locals = JSON.parse(window.localStorage.raw)
        let localInit = JSON.parse(window.localStorage.initialState)
        gg( prod.updateProductions({}, localInit[levelNo-1]) )
        updateProdMap(locals[levelNo-1], localInit[levelNo-1])
    }, [levelNo])
    // onmount and when level changes, get raw from localStorage.
    // see the interfaces at main.js

    return <div className='InputManager'>
        <Input 
            text={g.text}
            isEditable={true}
            raw={raw}
            errorMsg={g.text[g.errorMsgInd]}
            onInput={raw => updateProdMap(raw, g.initialState)}
        />
        <div className='InitialState'>
            <span> {g.text[16]} </span>
            <input type="text" value={g.initialState} onInput={ev => updateProdMap(raw, ev.target.value)}/>
        </div>
    </div>

    function updateProdMap (raw, initialState) {
        let result = analyseProductions(raw.parseProductions(), initialState)

        setRaw(raw)
        gg( prod.updateProductions(result.map, initialState, result.errorMsgInd) )

        // Save to localStorage
        let locals = JSON.parse(window.localStorage.raw)
        let localInit = JSON.parse(window.localStorage.initialState)
        locals[levelNo-1] = raw
        localInit[levelNo-1] = initialState
        window.localStorage.raw = JSON.stringify(locals)
        window.localStorage.initialState = JSON.stringify(localInit)
    }

    function analyseProductions (parsed, initState) {
        let result = {map: {}, errorMsgInd: undefined}
    
        // empty?
        if (parsed[parsed.length-1].length === 0) {
            result.errorMsgInd = 17
            return result
        }
    
        // not mod 5?
        if ( parsed[parsed.length-1].length % 5 !== 0) {
            result.errorMsgInd = 18
            return result
        }
    
        // no init?
        let initFound = false
        for (let i = 0; i<parsed.length; i++) {
            if (parsed[i][0] === initState) {
                initFound = true
                break
            }
        }
    
        if (!initFound) {
            result.errorMsgInd = 19
            return result
        }
    
        // movement symbol illegal?
        for (let i = 0; i<parsed.length; i++) {
            if (/^[UDRLN]$/.test(parsed[i][4]) !== true ) {
                result.errorMsgInd = 20
                return result
            }
        }
    
        // state names illegal?
        for (let i = 0; i<parsed.length; i++) {
            let regex = /^.{1,10}$/i
            if (!regex.test(parsed[i][0]) ||
            !regex.test(parsed[i][2]) ) {
                result.errorMsgInd = 21
                return result
            }
        }
    
        // tape values illegal?
        for (let i = 0; i<parsed.length; i++) {
            let regex = /^.{1,2}$/i
            if (!regex.test(parsed[i][1]) ||
            !regex.test(parsed[i][3]) ) {
                result.errorMsgInd = 22
                return result
            }
        }
    
        // no final?
        let finalFound = false
        for (let i = 0; i<parsed.length; i++) {
            if (parsed[i][2] === 'ACCEPT') {
                finalFound = true
                break
            }
        }
    
        if (!finalFound) {
            result.errorMsgInd = 23
            return result
        }
    
        // all is well
        // form the map (see interface of ProdMap on main.js)
        for (let i = 0; i<parsed.length; i++) {
            let key = `${parsed[i][0]} ${parsed[i][1]}`
            if ( !result.map[key] ) {
                result.map[key] = [ ...parsed[i] ]
            }
        }

        return result
    }
}
