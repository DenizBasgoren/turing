
import {render, h, Fragment} from 'preact'

export default function Credits ({version}) {
    return <div className="Credits">
        <span>
            <a href="https://github.com/denizbasgoren" target='_blank'> Deniz Bashgoren </a>
        · 2020 · v{version}
        </span>
    </div>
}