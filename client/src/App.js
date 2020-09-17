// IMPORTS
import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom'

// COMPONENTS
import Homepage from './views/Homepage.jsx'
import Newest from './views/Newest.jsx'
import Ask from './views/Ask.jsx'
import Show from './views/Show.jsx'
import Jobs from './views/Jobs.jsx'

// CONTEXT
import GlobalContext from './Context/GlobalContext.js'

// ENDPOINTS
import endpoints from './utils/endpoints.js'

// FUNCTIONS
import FETCH_itemData_from_IDarray from './utils/FETCH_itemData_from_IDarray.js'
import GET_topStories from './utils/GET_topStories.js'
import GET_newStories from './utils/GET_newStories.js'
import GET_askStories from './utils/GET_askStories.js'
import GET_jobStories from './utils/GET_jobStories.js'
import GET_showStories from './utils/GET_showStories.js'

// __MAIN__ 
function App() {
  // Context
  const { 
    topStory_IDs, setTopStory_IDs,
    newStory_IDs, setNewStory_IDs,
    askStory_IDs, setAskStory_IDs,
    jobStory_IDs, setJobStory_IDs,
    showStory_IDs, setShowStory_IDs,
    // storyData, setStoryData,
  } = useContext(GlobalContext)

  // State
  const [loading, isLoading] = useState(true)

  // useEFFECT
  useEffect(() => {
    console.log('FIRST USE EFFECT')
    // TODO: Promise.all => update isLoading
    // - 1 - // Top Stories
    GET_topStories()
      .then(data => {
        // TODO: REMOVE SLICE TO UPDATE ALL DATA
        setTopStory_IDs(data)
        // setTopStory_IDs(data.slice(0,50))
      })

    // - 2 - // New Stories
    GET_newStories()
      .then(data => {
        // TODO: REMOVE SLICE TO UPDATE ALL DATA
        setNewStory_IDs(data)
        // setNewStory_IDs(data.slice(0,50))
      })

    // - 3 - // Ask Stories
    GET_askStories()
      .then(data => {
        // TODO: REMOVE SLICE TO UPDATE ALL DATA
        setAskStory_IDs(data)
        // setNewStory_IDs(data.slice(0,50))
      })

    // - 4 - // Job Stories
    GET_jobStories()
      .then(data => {
        // TODO: REMOVE SLICE TO UPDATE ALL DATA
        setJobStory_IDs(data)
        // setNewStory_IDs(data.slice(0,50))
      })

    // - 5 - // Show Stories
    GET_showStories()
      .then(data => {
        // TODO: REMOVE SLICE TO UPDATE ALL DATA
        setShowStory_IDs(data)
        // setNewStory_IDs(data.slice(0,50))
      })
    console.log('end - FIRST USE EFFECT')
  }, [])

  useEffect(() => {
    if (
      topStory_IDs.length !== 0 && 
      newStory_IDs.length !== 0 &&
      askStory_IDs.length !== 0 &&
      jobStory_IDs.length !== 0 &&
      showStory_IDs.length !== 0
    ) {
      isLoading(false)
    }
  }, [topStory_IDs, newStory_IDs, askStory_IDs, jobStory_IDs, showStory_IDs])


  // Return
  if (loading) { return <div>App is Loading...</div>}
  return (
    <Switch className='App'>
      <Route exact path='/' render={ (props) => <Homepage {...props} key={Date.now()}/> }/>
      <Route exact path='/newest' render={ (props) => <Newest {...props} key={Date.now()}/> }/>
      <Route exact path='/ask' render={ (props) => <Ask {...props} key={Date.now()}/> }/>
      <Route exact path='/show' render={ (props) => <Show {...props} key={Date.now()}/> }/>
      <Route exact path='/jobs' render={ (props) => <Jobs {...props} key={Date.now()}/> }/>
    </Switch>
  )
}

// EXPORT
export default App;