
import { produce } from 'immer'

// these are functions to be used only on global state (g). An example:

/*
    Without produce:
    gg( {...otherProps, someProp: g.someProp+1 })

    With produce:
    gg( produce( s => {
        s.someProp++
    }))

    With produce, seperated
    let prod = produce( s => {
        s.someProp++
    })
    gg( prod )



    Another example
    Without produce:
    gg( {...otherProps, someProp: g.someProp+k})
    
    With produce:
    gg( produce( s => {
        s.someProp += k
    }))

    With produce, seperated
    let prod = k => produce(s => {
        s.someProp += k
    })
    gg( prod(k) )


    Note that when there are no parameters like k, production doesnt have to be seperated.
    This pattern is seen on TestManager and on TestInstance.
*/



export default {

    forceUpdate: () => produce(s => {
        s.dummy = Math.random()
    }),
    // changing a dummy variable triggers App re-render.

    toggleLighting: () => produce(s => {
        if (s.lighting === 'light') {
            window.localStorage.lighting = 'dark'
            s.lighting = 'dark'
        }
        else {
            window.localStorage.lighting = 'light'
            s.lighting = 'light'
        }
    }),
    updateLanguage: (text, language) => produce(s => {
        s.text = text
        s.language = language
        s.languageUpdateNeeded = false
    }),
    fetchLanguage: language => produce(s => {
        s.language = language
        s.languageUpdateNeeded = true
    }),
    levelComplete: no => produce(s => {
        s.wonLevels[no-1] = true
        window.localStorage.wonLevels = JSON.stringify( s.wonLevels )
    }),
    updateProductions: (map, initial, errorMsgInd) => produce(s => {
        s.prodMap = map
        s.initialState = initial
        s.errorMsgInd = errorMsgInd
    })
}
