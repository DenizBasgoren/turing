
import {useState, useEffect} from 'preact/hooks'
import {render, h, Fragment} from 'preact'
import {context, init, urlPrefix, currentAppVersion} from '../utils/init'
import prod from '../utils/productions'
import Header from './Header'
import Route from '../components/Route'
import MenuPage from './MenuPage'
import LevelPage from './LevelPage'
import HelpPage from './HelpPage'
import Credits from '../components/Credits'
import ScrollToTop from '../components/ScrollToTop'

// topmost component
export default function App () {

    let [s,ss] = useState(init)
    // these are local state and its setter.
    // by convention, s = local state, ss = setter
    // these two also happen to be "global state" since App is topmost component.
    // so, they are referenced as g and gg elsewhere (abr. global)


    // uncomment to set public for debug purposes
    // useEffect( () => {
    //     window._state = s
    //     window._updatestate = ss
    //     window._marked = marked
    //     window._testF = test_functions
    // })


    useEffect( () => {
        window.onpopstate = ev => {
            ss( prod.forceUpdate() )
        }
        // re-render needed when url changes

        window.onresize = ev => {
            ss( prod.forceUpdate() )
        }
        // also when resized
    }, [])



    useEffect( () => {
        document.body.classList.remove('dark')
        if (s.lighting === 'dark') {
            document.body.classList.add('dark')
        }
    }, [s.lighting])
    // css uses the following convention
    /*
        someSelector {
            propsForLightTheme
        }

        body.dark someSelector {
            propsForDarkTheme
        }
    */


    useEffect( () => {
        if (!s.languageUpdateNeeded) return

        window.localStorage.language = s.language

        fetch(`${urlPrefix}/text/${s.language}.json`)
        .then( res => res.text() )
        .then( str => {
            window.localStorage.text = str
            ss( prod.updateLanguage( JSON.parse(str), s.language ) )
        })

    }, [s.languageUpdateNeeded])
    // when languageUpdateNeeded is set to true, re-render occurs, and then
    // this effect runs. lang is downloaded from respective folder
    // saved on localStorage
    // then languageUpdateNeeded is set to false
    // re-render occurs, displaying new lang text this time
    // this effect runs again, but stopped immediately
    // this is to prevent infinite loop



    // [s,ss] are passed down the tree. They will be called as [g,gg]
    
    return <context.Provider value={[s,ss]}>
        <div className='App'>
            <Header />
            <Route href={/^\/?(?:index\.html)?$/i}>
                <MenuPage />
            </Route>
            <Route href={/^\/?(\d+)\/?$/}>
                <LevelPage />
            </Route>
            <Route href={/^\/?help\/?$/i}>
                <HelpPage />
            </Route>
            <Credits version={currentAppVersion} />
            <ScrollToTop />
        </div>
    </context.Provider>
}
