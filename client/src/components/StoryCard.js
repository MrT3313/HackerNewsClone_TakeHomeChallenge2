// IMPORTS
import React, { useState, useEffect, useContext } from 'react'

// CONTEXT
import GlobalContext from '../Context/GlobalContext.js'

// ENDPOINTS
import endpoints from '../utils/endpoints.js'

// FUNCTIONS
import toBaseURL from '../utils/REGEX_toBaseURL.js'
import FETCH_data from '../utils/FETCH_data.js'

// STYLES
import '../styles/StoryCard.css'

// __MAIN__
function StoryCard({id, idx}) {
    // Context
    const { setStoryData } = useContext(GlobalContext)

    // State
    const [ isLoading, setIsLoading ] = useState(true)
    const [ data, setData ] = useState() 

    // useEFFECT
    useEffect(() => {
        FETCH_data(endpoints.HN_BASE_URL, endpoints.item, id, '.json')
            .then(storyData => {
                // setStoryData(storyData)
                setData(storyData)
            })
            .then(() => setIsLoading(false))
    }, [])

    if (isLoading) { return <div className="StoryCard loading">LOADING</div>}
    return (
        <div className="StoryCard">
            <div className='Right'>
                <div className="Idx">{idx}.</div>
            </div>
            <div className='Left'>
                <div className='top'>
                    <a className='title' href={data.url && data.url} target='_blank'>
                        {data.title}
                    </a>
                    <a className='url'>
                        {data.url && '(' + toBaseURL(data.url) + ')'}
                    </a>
                </div>
                <div className='bottom'>
                    <div className='points'>
                        {data.score && `${data.score} points`}
                    </div>
                    <div className='author'>
                        {`by ${data.by}`}
                    </div>
                    <div className='timeSincePost'>
                        {`${data.time}`}
                        {`${Math.floor(Math.abs(Date.now() - new Date(data.time * 1000)) / 36e5)} hour ago`}
                    </div>
                    <div className='NavPipe'>|</div>
                    <div>hide</div>
                    <div className='NavPipe'>|</div>
                    <div>
                        {/* {data.kids && `${data.kids.length} comments`} */}
                        {data.kids && `${data.descendants} comments`}
                    </div>
                </div>
            </div>
        </div>
    )
}

// EXPORTS
export default StoryCard