
import {useRef, useEffect} from 'preact/hooks'
import {render, h, Fragment} from 'preact'


// Originally written by Dan Abramov on overreacted.io.
// Component which starts an interval onmount and clears on unmount.
// signature exactly same as setInterval.
export default function Interval ({callback, delay}) {
    const savedCallback = useRef();
    
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    
    // Set up the interval.
    useEffect(() => {
        function tick() {
        savedCallback.current();
        }
        if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
        }
    }, [delay]);

    return <> </>
}
