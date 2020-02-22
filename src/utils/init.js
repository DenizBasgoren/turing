
import {createContext} from 'preact'

let context = createContext()
// this will be used to pass App's local state and state setter down the tree.
// this will allow any component to read and update the App's state.
// throughout this code, global state will be abbreviated as g, and its setter as gg.

let languages = ['EN', 'TR']
// this will be displayed on the header

let levelCount = 10
// this is needed by LevelPage to display correct amount of levels

let currentAppVersion = '1.2'
// app's version will always be saved on localStorage.version. This is for integrity

// if current version doesnt match the saved version (last version), make these changes
if ( +window.localStorage.version !== currentAppVersion) {
    // changes

    delete window.localStorage.text
    delete window.localStorage.language

    // update to current version
    window.localStorage.version = currentAppVersion
}

let urlPrefix = '/turing'
// urlPrefix makes it seamless to run the app on both / and on /turing. It can run on any other url too.
// please see the important note on main.js.
// use '' on local, '/turing' on github pages.


if ( location.hash ) {
    history.replaceState({}, '', `${location.pathname}${location.hash.substring(1)}`)
}
// this piece of code is important to make it possible to start the app from any url, not just /.
// for example, you send url denizbasgoren.github.io/turing/2 to your friend to invite them to solve the problem.
// here the path is /turing/2. What github pages does is, check whether such a file exists or not.
// in this case, such a file doesnt exist. these are just params. Github pages will redirect to 404.html
// Note that even though it redirects to 404.html, path remains the same ( /turing/2 ).
// The js code in 404.html changes /turing/2 to /turing#/2.
// That is, urlPrefix + params to urlPrefix + # + params.
// This trick allows to have params untouched, while the app will be redirected to /turing.
// This is the only way to redirect to the main app.
// Other solutions would be to use querystrings, which are not employed here, due to bad appearance.
// Once the 404.html redirects to urlPrefix + # + params, main app sees the path through location.pathname,
// and it changes it once again to urlPrefix + params, but this time, without triggering redirection.
// this is possible with history api's replacestate func.


let init = {
    language: window.localStorage.language,
    text: window.localStorage.text,
    languageUpdateNeeded: false,
    lighting: window.localStorage.lighting || 'dark', // light dark
    wonLevels: window.localStorage.wonLevels,
    prodMap: {},
    initialState: '',
    errorMsgInd: '',
}
// this is the initial global state. This will be available on any component which uses the line
// let [g,gg] = useContext(context)
// g = global state, gg = setter



if (!init.language || !init.text) {
    init.languageUpdateNeeded = true
    init.language = languages[ 0 ]
    init.text = []
}
else {
    init.text = JSON.parse( init.text )
}
// since the app is multilingual, we avoid downloading all the languages on startup. Instead,
// we keep them under /text/ and fetch them as requested. Once downloaded, we keep the text in
// localStorage.text, and the lang under localStorage.language
// this is to save data, and for offline performance of the app.
// if the lang was not specified, set default to EN.
// text is an array of strings, which will be kept under g.text.

if (!init.wonLevels) {
    init.wonLevels = Array( levelCount ).fill(false)
    window.localStorage.wonLevels = JSON.stringify( init.wonLevels )
}
else {
    init.wonLevels = JSON.parse( init.wonLevels )
}
// wonLevels has is an array of levelCount x booleans. This is also lept in localstorage and also in state,
// so that user sees which levels have been won.


if (!window.localStorage.raw) {
    window.localStorage.raw = JSON.stringify(Array(levelCount).fill('') )
}
// raw denotes "raw input". Raw for every level is kept under localstorage, as well as on g.
// It is an array of strings, one for every level. Index starts at 0.
// raw input is the instructions entered in the textarea in the level pages.

if (!window.localStorage.initialState) {
    window.localStorage.initialState = JSON.stringify(Array(levelCount).fill(''))
}
// initialState is another part of the input

export {
    context,
    languages,
    levelCount,
    currentAppVersion,
    urlPrefix,
    init
}
