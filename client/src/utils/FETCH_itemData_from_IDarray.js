export default async function(array_of_IDs, unique_ID, URL_base, URL_endpoint, URL_suffix = '') {
    // Variables
    let returnObject = {}

    // Main Loop
    for(const [idx, id] of array_of_IDs.entries()) {
        // Create Fetch URL
        const url = `${URL_base}${URL_endpoint}${id}${URL_suffix}`
        // Get Data
        const data = await fetch(url)
            .then(itemData => itemData.json())
            .catch(err => console.log(err))
        // Update Return Object
        returnObject[data[unique_ID]] = data
        // Update Item Data w/ Index
        returnObject[data[unique_ID]].idx = idx
    }
    // Return
    return returnObject
}