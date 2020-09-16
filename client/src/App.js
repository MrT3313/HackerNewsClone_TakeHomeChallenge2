// IMPORTS
import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom'

// COMPONENTS
import Homepage from './views/Homepage.jsx'
// import Newest from './views/Newest.jsx'

// CONTEXT
import GlobalContext from './Context/GlobalContext.js'

// ENDPOINTS
import endpoints from './utils/endpoints.js'

// FUNCTIONS
import FETCH_itemData_from_IDarray from './utils/FETCH_itemData_from_IDarray.js'
import GET_topStories from './utils/GET_topStories.js'
import GET_newStories from './utils/GET_newStories.js'

// __MAIN__ 
function App() {
  // Context
  const { 
    topStory_IDs, setTopStory_IDs,
    newStory_IDs, setNewStory_IDs,
    storyData, setStoryData,
  } = useContext(GlobalContext)

  // State
  const [loading, isLoading] = useState(true)

  // useEFFECT
  useEffect(() => {
    console.log('FIRST USE EFFECT')
    // - 1 - // Top Stories
    GET_topStories()
      .then(data => {
        // TODO: REMOVE SLICE TO UPDATE ALL DATA
        // setTopStory_IDs(data)
        setTopStory_IDs(data.slice(0,50))
      })

    // - 2 - // New Stories
    GET_newStories()
      .then(data => {
        // TODO: REMOVE SLICE TO UPDATE ALL DATA
        // setNewStory_IDs(data)
        setNewStory_IDs(data.slice(0,50))
      })
    console.log('end - FIRST USE EFFECT')
  }, [])
    
  useEffect(() => {
    console.log('SECOND USE EFFECT')
    if ( topStory_IDs.length !== 0) {
      FETCH_itemData_from_IDarray(topStory_IDs, 'id', endpoints.HN_BASE_URL, endpoints.item, '.json')
        .then(data => {
          setStoryData(data)
        })
    }
    console.log('end - SECOND USE EFFECT')
  }, [topStory_IDs])

  useEffect(() => {
    console.log('THIRD USE EFFECT')
    if (
      topStory_IDs.length !== 0 && 
      Object.keys(storyData).length !== 0
    ) {
      isLoading(false)
    }
    console.log('end - THIRD USE EFFECT')
  },[topStory_IDs, storyData])


  // Return
  if (loading) { return <div>App is Loading...</div>}
  return (
    <Switch className='App'>
      <Route exact path='/' component={Homepage} />
      {/* <Route exact path='/news' component={Homepage} /> */}
      {/* <Route exact path='/newest' component={Newest} /> */}
    </Switch>
  )
}

// EXPORT
export default App;