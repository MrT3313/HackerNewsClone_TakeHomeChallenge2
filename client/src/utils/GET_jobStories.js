// IMPORTS
import FETCH_data from './FETCH_data.js'

// ENDPOINTS
import endpoints from './endpoints.js'

// EXPORT
export default async function() {
    return FETCH_data(endpoints.HN_BASE_URL, endpoints.jobStories)
}