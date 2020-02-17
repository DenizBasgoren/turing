
import {useState, useEffect, useContext} from 'preact/hooks'
import {render, h, Fragment} from 'preact'
import {context, urlPrefix} from '../utils/init'
import prod from '../utils/productions'
import Link from './Link'
import LanguageManager from './LanguageManager'

export default function Header () {
    let [g,gg] = useContext(context)
    let [moonIcon, setMoonIcon] = useState('')
    let [sunIcon, setSunIcon] = useState('')

    useEffect(() => {
        fetch(`${urlPrefix}/img/moon.svg`)
        .then(res => res.text())
        .then(svg => {
            setMoonIcon(svg)
        })
        .catch(console.error)

        fetch(`${urlPrefix}/img/sun.svg`)
        .then(res => res.text())
        .then(svg => {
            setSunIcon(svg)
        })
        .catch(console.error)
    }, [])

    let icon = g.lighting === 'light' ? sunIcon : moonIcon

    return <div className="Header">
        <div>
            <Link href='/' title={g.text[42]}>
                {g.text[0]}
            </Link>
        </div>
        <div
            title={g.lighting === 'light' ? g.text[44] : g.text[43]}
            onClick={() => gg( prod.toggleLighting() )}
            dangerouslySetInnerHTML={{__html: icon}}>
        </div>
        <LanguageManager />
        <Link href='/help' title={g.text[46]}>
            ?
        </Link>
        <a href='https://github.com/denizbasgoren/turing'>
            Github
        </a>
    </div>
}
