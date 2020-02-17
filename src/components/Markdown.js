
import marked from 'marked'
import {render, h, Fragment} from 'preact'

// text: markdown string. outputs html.
export default function Markdown ({text}) {
    return <div
        className="Markdown"
        dangerouslySetInnerHTML={{
            __html: marked(text || '')
        }}    
    >
    </div>
}
