export default async function(URL_base, URL_endpoint, unique_ID = '', URL_suffix = ''){
    return await fetch(`${URL_base}${URL_endpoint}${unique_ID}${URL_suffix}`)
        .then(data => data.json())
}