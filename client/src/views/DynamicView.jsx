// IMPORTS
import React, { useState, useContext } from 'react';

// COMPONENTS
import NavBar from '../components/NavBar.js'
import Footer from '../components/Footer.js'
import CardCreator from '../components/CardCreator.js'
import StoryCard from '../components/StoryCard.js'

// CONTEXT
import GlobalContext from '../Context/GlobalContext.js'

// STYLES
import '../styles/DynamicView.css'

// __MAIN__ 
function DynamicView({DynamicClassName, IDs}) {
    // Context
    // TODO: LEARN HOW TO TEST & REMOVE HARD CODING
    // const maxPerPage = 30
    const { maxPerPage } = useContext(GlobalContext)

    // State
    const [currPage, setCurrPage] = useState(1)

    // Pagination
    const idxOfLastPost = currPage * maxPerPage
    const idxOfFirstPost = idxOfLastPost - maxPerPage
    const currPosts = IDs.slice(idxOfFirstPost, idxOfLastPost)

    return (
        <div className={`DynamicView ${DynamicClassName}`} data-testid='DynamicView_rendered'>
            <NavBar />
            <CardCreator 
                array_of_IDs={currPosts} 
                maxPerPage={maxPerPage} currentPage={currPage}
                component={StoryCard}
            /> 
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
export default DynamicView;