export default async function(URL_base, URL_endpoint, URL_suffix = ''){
    return await fetch(`${URL_base}${URL_endpoint}${URL_suffix}`)
        .then(data => data.json())
}