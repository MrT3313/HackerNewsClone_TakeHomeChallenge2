// IMPORTS
import React, { useState, useEffect } from 'react'

// ENDPOINTS
import endpoints from '../utils/endpoints.js'

// STYLES
import '../styles/StoryCard.css'

// __MAIN__
function StoryCard({itemNum, idx}) {
console.log('StoryCard Props: ', itemNum, idx)
    // State
    const [loading, setLoading] = useState(true)
    const [storyData, setStoryData] = useState(false)
    
    // useEffect 
    useEffect(() => {
        console.log('StoryCard UseEffect')
        setLoading(true)
        fetch(`${endpoints.HN_BASE_URL}${endpoints.item}${itemNum}.json`)
          .then(response => response.json())
          .then(data => {
            console.log('Data - From Fetch',data)
            setStoryData(data)
          })
          .then(() => setLoading(false))
          .catch(err => console.log(err))
    }, [])
    // Return
    if (loading) {return <div>LOADING STORY DETAILS...</div>}
    return (
        <div className="StoryCard">
            <div className="Idx">{idx}.</div>
            <div>{storyData.title}</div>
        </div>
    )
}

// EXPORTS
export default StoryCard