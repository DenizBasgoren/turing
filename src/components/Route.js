
import {urlPrefix} from '../utils/init'

// href: regex (urlPrefix must be omitted!)
// children will be rendered conditionally
// children will be passed href prop, which is what is returned from exec
export default function Route({href, children}) {
    
    let result = href.exec( location.pathname.substring( urlPrefix.length ) )
    // substring will skip the urlPrefix


    if (result) {
        if (children instanceof Array) return children.map( c => {
            c.props.href = result
            return c
        })
        else {
            children.props.href = result
            return children
        }
    }
}
