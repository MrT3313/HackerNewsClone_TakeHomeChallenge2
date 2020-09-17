// IMPORTS
import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom'

// COMPONENTS
import Dynamic from './views/Dynamic.jsx'

// CONTEXT
import GlobalContext from './Context/GlobalContext.js'

// ENDPOINTS
import endpoints from './utils/endpoints.js'

// FUNCTIONS
import GET_IDs from './utils/GET_IDs.js'

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
    GET_IDs(endpoints.HN_BASE_URL, endpoints.topStories)
      .then(data => {
        // TODO: REMOVE SLICE TO UPDATE ALL DATA
        setTopStory_IDs(data)
        // setTopStory_IDs(data.slice(0,50))
      })

    // - 2 - // New Stories
    GET_IDs(endpoints.HN_BASE_URL, endpoints.newStories)
      .then(data => {
        // TODO: REMOVE SLICE TO UPDATE ALL DATA
        setNewStory_IDs(data)
        // setNewStory_IDs(data.slice(0,50))
      })

    // - 3 - // Ask Stories
    GET_IDs(endpoints.HN_BASE_URL, endpoints.askStories)
      .then(data => {
        // TODO: REMOVE SLICE TO UPDATE ALL DATA
        setAskStory_IDs(data)
        // setNewStory_IDs(data.slice(0,50))
      })

    // - 4 - // Job Stories
    GET_IDs(endpoints.HN_BASE_URL, endpoints.jobStories)
      .then(data => {
        // TODO: REMOVE SLICE TO UPDATE ALL DATA
        setJobStory_IDs(data)
        // setNewStory_IDs(data.slice(0,50))
      })

    // - 5 - // Show Stories
    GET_IDs(endpoints.HN_BASE_URL, endpoints.showStories)
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
      <Route exact path='/' render={ (props) => <Dynamic {...props} key={Date.now()} IDs={topStory_IDs}/> }/>
      <Route exact path='/newest' render={ (props) => <Dynamic {...props} key={Date.now()} IDs={newStory_IDs}/> }/>
      <Route exact path='/ask' render={ (props) => <Dynamic {...props} key={Date.now()} IDs={askStory_IDs}/> }/>
      <Route exact path='/show' render={ (props) => <Dynamic {...props} key={Date.now()} IDs={showStory_IDs}/> }/>
      <Route exact path='/jobs' render={ (props) => <Dynamic {...props} key={Date.now()} IDs={jobStory_IDs}/> }/>
    </Switch>
  )
}

// EXPORT
export default App;