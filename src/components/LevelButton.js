
import {render, h, Fragment} from 'preact'

// used only on MenuPage
export default function LevelButton({isComplete, levelNo, title }) {
    return <div
        className={`LevelButton ${isComplete && 'complete'}`}
        title={title}    
    >
        <div>
            {levelNo}
        </div>
        <div>
            <div className='title'>
                {title}
            </div>
            {
                isComplete && <span className='tick'>✔</span>
            }
        </div>
    </div>
}
