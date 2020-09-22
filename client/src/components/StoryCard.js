// IMPORTS
import React, { useState, useEffect } from 'react'

// ENDPOINTS
import endpoints from '../utils/endpoints.js'

// FUNCTIONS
import REGEX_toBaseURL from '../utils/REGEX_toBaseURL.js'
import FETCH_data from '../utils/FETCH_data.js'

// STYLES
import '../styles/StoryCard.css'

// __MAIN__
function StoryCard({id, idx}) {
    // State
    const [ baseURL, setBaseURL ] = useState()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ data, setData ] = useState() 

    // useEFFECT
    useEffect(() => {
        FETCH_data(endpoints.HN_BASE_URL, endpoints.item, id, '.json')
            .then(storyData => {
                setData(storyData)
                storyData.url && setBaseURL(REGEX_toBaseURL(storyData.url))
            })
            .then(() => setIsLoading(false))
    }, [id])

    if (isLoading) { 
        return (
            <div className="StoryCard loading" data-testid='StoryCard_loading'>
                LOADING
            </div>
        )
    }
    return (
        <div className='StoryCard' data-testid='StoryCard_rendered'>
            <div className='Right'>
                <div className="Idx">{idx}.</div>
            </div>
            <div className='Left'>
                <div className='top'>
                    <a  className='title' data-testid='title'
                        href={data.url && data.url} target='_blank' rel="noopener noreferrer"
                    >
                        {data.title}
                    </a>
                    <a  className='base_URL' data-testid='base_URL'
                        href={baseURL && `https://${baseURL}`} target='_blank' rel="noopener noreferrer"
                    >
                        {data.url && `( ${baseURL} )`}
                    </a>
                </div>
                <div className='bottom'>
                    <div className='score' data-testid='score'> 
                        {data.score && `${data.score} points`}
                    </div>
                    <div className='author' data-testid='author'> 
                        {`by ${data.by}`}
                    </div>

                    <div className='timeSincePost' data-testid='timeSincePost'>
                        {/* TODO: Util Date Formatter */}
                        {`${Math.floor(Math.abs(Date.now() - new Date(data.time * 1000)) / 36e5)} hour ago`}
                    </div>
                    <div className='NavPipe'>|</div>
                    <div>hide</div>
                    <div className='NavPipe'>|</div>
                    <div className='descendants' data-testid='descendants'>
                        {data.descendants ? `${data.descendants} comments` : `discuss`}
                    </div>
                </div>
            </div>
        </div>
    )
}

// EXPORTS
export default StoryCard