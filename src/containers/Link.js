

import {render, h, Fragment} from 'preact'
import {useContext} from 'preact/hooks'
import {context, urlPrefix} from '../utils/init'
import prod from '../utils/productions'

// NOTE: please omit urlPrefix while using. prefixes are added here, to avoid clutter
export default function Link({href, title, children}) {

    let [g,gg] = useContext(context)
    let newLink = `${urlPrefix}${href}`
    return <a
        href={newLink}
        class='Link'
        title={title}
        onClick={handleClick}
    >
        {children}
    </a>


    function handleClick(ev) {
        ev.preventDefault()
        history.pushState( {}, '', newLink)
        gg( prod.forceUpdate() )
    }
}
