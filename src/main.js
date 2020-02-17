import './style.css'
import { render, h, Fragment } from 'preact'
import './utils/std_overrides'
import './utils/init'
import App from './containers/App'



render(<App />, document.body)


/*
This is a single page webapp project written in HTML,CSS,JS.
It uses Babel as transpiler (JSX->ES6->ES5)
It uses Parcel as minifier and bundler
It uses npm and its config file package.json for dependency management
It uses Preact as its main ui library, which is a lightweight clone of React.
It uses only functional components, aided with context and hooks.
It depends on a few other libraries to get the job done:
- Marked: takes markdown string and outputs html
- Immer: the only important function is produce, which takes an object, and a function, which describes what to do on the object. It outputs the same object with the function applied onto it. The key is that the initial object remains untouched, or "immutable". It is easier to use produce instead of ... syntax.

Project is divided into 6 folders: "components", "containers", "test_functions", "utils", "text", "img"

Components vs containers: the difference between these two is actually blurry and subjective. My convention is that to put components which access the global state into containers folder. Read further for the global state.

TestFunctions is a folder of pure js functions, needed for the application to run. These functions might import some other libraries. Though they don't right now.

Text: since this app is multilingual, we keep all the languages seperate, and download only as requested.

Utils is a multipurpose folder, it could also be named "other". It contains "init.js", "productions.js", "std_overrides.js"

Std_overrides: It is important to make overrides to the standard library as visible as possible.

Init: the first piece of code that runs on startup. It is about setting up initial state, reading localStorage state.

Productions: These are the functions to be passed to immer's produce function. These take a single param s, which is the object, on which the change will be applied. Abbreviated after "state".






IMPORTANT NOTE: This project is designed to run on local, as well as on github pages. It is important to set the environment variables right to get the app working correctly.

- Update the variable urlPrefix, found on 404.html and utils/init.js.
If on local, urlPrefix = '', else if on github pages, urlPrefix = '/turing'.







Interfaces:

ProdMap: {
    [`${stateFrom} ${symbol}`] : [stateFrom, symbol, stateTo, symbolTo, move]
}

Note that xy plane starts at top-left corner and y rises downwards
Tape: {
    [`${x} ${y}`] : symbol
}

Test: {
    tape: Tape,
    expected: Boolean
}





Pattern of flags-commands used throughout the code:
This pattern is used when parent component wants to trigger a state change on the child component
by calling one of its state changing functions. The method is to pass down a "flag":
This flag will be used in onEffect sensitivity lists. Onmount, flag will trigger.
When parent wants to trigger state change, it passes a different flag, which will trigger onEffect
on the child.
For the parent to pass such a flag, it has to keep the current state of the flag on its own state.
On parents state, flag is referred to as "command". As in "command is given to the child".
When the command is issued, parent component will want to "turn off" the flag, which is referred to as
"suppressing flags"


*/
