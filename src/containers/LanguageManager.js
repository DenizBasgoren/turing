
import {useContext} from 'preact/hooks'
import {render, h, Fragment} from 'preact'
import {context, languages} from '../utils/init'
import prod from '../utils/productions'


export default function LanguageManager() {
    let [g,gg] = useContext(context)

    return <div>
        <select
        title={g.text[45]}
        onInput={ev => gg( prod.fetchLanguage( languages[ev.target.selectedIndex]))}>
            {
                languages.map((l,i) => <option
                    key={i}
                    selected={ g.language === l }
                    value={l}>
                        {l}
                    </option>)
            }
        </select>
    </div>

}
