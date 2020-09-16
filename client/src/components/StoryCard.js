// IMPORTS
import React from 'react'

// FUNCTIONS
import toBaseURL from '../utils/toBaseURL.js'

// STYLES
import '../styles/StoryCard.css'

// __MAIN__
function StoryCard({data, idx}) {
    return (
        <div className="StoryCard">
            <div className='Right'>
                <div className="Idx">{data.idx + 1}.</div>
            </div>
            <div className='Left'>
                <div className='top'>
                    <a className='title' href={data.url} target='_blank'>
                        {data.title}
                    </a>
                    <a className='url'>
                        {'(' + toBaseURL(data.url) + ')'}
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
                        {/* {`${data.time}`} */}
                        {`${Math.floor(Math.abs(
                            Date.now() - new Date(data.time * 1000)
                        ) / 36e5)} hour ago
                        `}
                    </div>
                    <div className='NavPipe'>|</div>
                    <div>hide</div>
                    <div className='NavPipe'>|</div>
                    <div>
                        {data.kids && `${data.kids.length} comments`}
                    </div>
                </div>
            </div>
        </div>
    )
}

// EXPORTS
export default StoryCard