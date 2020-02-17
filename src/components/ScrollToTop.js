

import {useState, useEffect} from 'preact/hooks'
import {render, h, Fragment} from 'preact'

// up arrow used only on HelpPage
export default function ScrollToTop () {
    let [isScrolledDown, setScrolledDown] = useState(pageYOffset ? true : false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrolledDown( pageYOffset ? true : false )
        })
    }, [])

    if (isScrolledDown) {
        return <button className='ScrollToTop' onClick={handleClick}> ▲ </button>
    }
    
    function handleClick() {
        window.scrollTo(0,0)
    }
}

