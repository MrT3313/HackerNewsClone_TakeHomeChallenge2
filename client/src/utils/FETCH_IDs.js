// IMPORTS
import FETCH_data from './FETCH_data.js'

const FETCH_IDs = (URL_base, URL_endpoint) => {
    return FETCH_data(URL_base, URL_endpoint)
}

export default function(URL_base, endpointsArray) {
    return Promise.all(
        endpointsArray.map(ep => {
            return FETCH_IDs(URL_base, ep)
        })
    )
    .catch(err => console.log(`Error in FETCH_IDs Promise.All: ${err}`))
}