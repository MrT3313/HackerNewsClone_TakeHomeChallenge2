// IMPORTS
import React, { useState, useEffect, useContext } from 'react';

// COMPONENTS
import NavBar from '../components/NavBar.js'
import Footer from '../components/Footer.js'
import StoryCard from '../components/StoryCard.js'

// CONTEXT
import GlobalContext from '../Context/GlobalContext.js'

// ENDPOINTS
import endpoints from '../utils/endpoints.js'

// STYLES
import '../styles/Entry.css'

// __MAIN__ 
function Entry() {
    // Context
    const { topStory_IDs, storyData } = useContext(GlobalContext)

    // State
    const [currPage, setCurrPage] = useState(1)
    const [maxPerPage, setMaxPerPage] = useState(30)

    // Pagination
    const idxOfLastPost = currPage * maxPerPage
    const idxOfFirstPost = idxOfLastPost - maxPerPage
    const currPosts = topStory_IDs.slice(idxOfFirstPost, idxOfLastPost)

    return (
        <div className='Entry'>
            <NavBar />
            {currPosts.map((id, idx) => {
                console.log(id, idx)
                return (
                    <StoryCard key={storyData[id].idx} data={storyData[id]}/> 
                )
            })}
            <div className='Pagination'>
                <div onClick={() => setCurrPage(currPage + 1)}>
                    More
                </div>
            </div>
            <Footer />
        </div>
    )
}

// EXPORT
export default Entry;