

import {useState, useEffect} from 'preact/hooks'
import {render, h, Fragment} from 'preact'
import { produce } from 'immer'


// NOTE: this uses the flags-commands convention. For an explanation, see main.js
// xprev (x previous) and yprev are only needed for visual purposes
// resetFlag will reset origin back so that (0,0) is the center of the tape.
// this can be changed by clicking on the tape. it will change the origin.
export default function Tape({tape, x, y, xprev, yprev, widthInPixels, resetFlag}) {
    let [tm, setTm] = useState({
        w: 0,
        h: 0,
        ox: 0, // abr. "origin x"
        oy: 0, // abr. "origin y"
    })
    // (ox,oy) is the actual index of the cell displayed on top-left corner.
    // for example, if origin=(-1,-1) and p=(0,-1), p will be top-second-leftmost cell.

    useEffect(() => {
        reset()
    }, [resetFlag])
    // if resetFlag set, reset.

    useEffect(()=> {
        // for produce, see explanation of the pattern on /utils/productions.js
        setTm( produce(s => {
            s.w = Math.floor( widthInPixels / 33 )
            if (s.w % 2 == 0) s.w-- // width must be odd, so that TM is on the center
            if (s.w < 0) s.w = 0
            if (s.w > 25) s.w = 25 // max 25 cell width
            s.h = Math.ceil( s.w / 2 ) // height must be odd too
            if (s.h % 2 == 0) s.h++

            s.ox = - Math.floor( s.w / 2) // set origin such that (0,0) is center
            s.oy = - Math.floor( s.h / 2)
        }))
    }, [widthInPixels])
    // recalc when width changes

    return <table className='Tape'>
        <tbody>
            {
                Array(tm.h).fill(true).map((_,i) => <tr>
                    {
                        Array(tm.w).fill(true).map((_,j) => {
                            let ax = tm.ox+j // abr. "actual x"
                            let ay = tm.oy+i
                            let key = `${ax} ${ay}`
                            let val = tape[key]

                            return <td
                                className={[
                                    ax === x && ay === y && 'current',
                                    ax === xprev && ay === yprev && 'previous'
                                ].join(' ')}
                                onClick={handleMoveTape.bind(this, ax, ay)}
                            >
                                {val}
                            </td>
                        })
                    }
                </tr>)
            }
        </tbody>
    </table>

    function handleMoveTape (ax, ay, ev) {
        setTm( produce(s => {
            s.ox = ax - Math.floor( s.w / 2)
            s.oy = ay - Math.floor( s.h / 2)
        }))
        ev.stopPropagation()
    }

    function reset() {
        setTm( produce( s => {
            s.ox = - Math.floor( s.w / 2)
            s.oy = - Math.floor( s.h / 2)
        }))
    }
}
