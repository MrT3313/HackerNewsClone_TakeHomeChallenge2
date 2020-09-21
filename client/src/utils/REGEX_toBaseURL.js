// TODO: Update Regex => FAILED TESTs: 
// 1. https://www.joh.cam.ac.uk/worlds-largest-ever-dna-sequencing-viking-skeletons-reveals-they-werent-all-scandinavian

export default function toBaseURL(fullURL){
    return fullURL.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '');
}