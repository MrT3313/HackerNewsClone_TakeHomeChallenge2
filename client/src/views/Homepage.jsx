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
import '../styles/Homepage.css'

// __MAIN__ 
function Homepage() {
  // State
  const { setTopStory_IDs, topStory_IDs } = useContext(GlobalContext)

  const [loading, setLoading] = useState(false)
  // const [pages, setPages] = useState([])
  const [currPage, setCurrPage] = useState(1)
  const [maxPerPage, setMaxPerPage] = useState(30)
  
  // useEffect
  useEffect(() => {
    console.log('<Homepage /> USE EFFECT')
    setLoading(true)
    fetch(`${endpoints.HN_BASE_URL}${endpoints.topStories}`)
      .then(response => response.json())
      .then(data => {
        console.log('Data - From Fetch',data)
        setTopStory_IDs(data)
      })
      .then(() => setLoading(false))
      .catch(err => console.log(err))
  }, [currPage, maxPerPage])

  // Current Posts
  const idxOfLastPost = currPage * maxPerPage
  const idxOfFirstPost = idxOfLastPost - maxPerPage
  const currPosts = topStory_IDs.slice(idxOfFirstPost, idxOfLastPost)

  // Return
  if (loading) {return <div>LOADING</div>}
  return (
    <div className='Homepage'>
      <NavBar />
      {currPosts.map((story, idx) => <StoryCard itemNum={story} idx={idx + 1}/>)}
      {/* {topStory_IDs.map((story, idx) => <StoryCard itemNum={story} idx={idx + 1}/>)} */}
      <div className='Pagination'>
        <div onClick={() => {
          console.log('Pagination Clicked')
          setCurrPage(currPage + 1)
        }}>
          More
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Homepage;
