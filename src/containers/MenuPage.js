
import {useContext, useEffect} from 'preact/hooks'
import {render, h, Fragment} from 'preact'
import {context, levelCount} from '../utils/init'
import prod from '../utils/productions'
import Link from './Link'
import LevelButton from '../components/LevelButton'


// note that level numbers start from 1, while indexes on state and localStorage start from 0.
export default function MenuPage() {
    let [g,gg] = useContext(context)

    useEffect(() => {
        document.title = g.text[0]
    }, [g.languageUpdateNeeded])

    return <div className="MenuPage">
        {
            Array(levelCount).fill(true).map( (tt,i) => <Link href={`/${i+1}`}>
                <LevelButton title={g.text[i+1]} levelNo={i+1}
                isComplete={g.wonLevels[i]}
                onClick={handleClick.bind(this, i+1)} />
            </Link>)
        }
    </div>

    function handleClick (no, ev) {
        gg( prod.levelComplete(no) )
    }
}
