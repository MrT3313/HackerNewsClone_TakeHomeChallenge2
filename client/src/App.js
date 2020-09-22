// IMPORTS
import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom'

// COMPONENTS
import DynamicView from './views/DynamicView.jsx'

// CONTEXT
import GlobalContext from './Context/GlobalContext.js'

// ENDPOINTS
import endpoints from './utils/endpoints.js'

// FUNCTIONS
import FETCH_ALL_IDs from './utils/FETCH_ALL_IDs.js'

// __MAIN__ 
function App() {
  // Context
  const { 
    topStory_IDs, setTopStory_IDs,
    newStory_IDs, setNewStory_IDs,
    askStory_IDs, setAskStory_IDs,
    jobStory_IDs, setJobStory_IDs,
    showStory_IDs, setShowStory_IDs,
  } = useContext(GlobalContext)

  // State
  const [loading, isLoading] = useState(true)

  // useEFFECT
  useEffect(() => {
    FETCH_ALL_IDs(endpoints.HN_BASE_URL, [
      endpoints.topStories,
      endpoints.newStories,
      endpoints.askStories,
      endpoints.jobStories,
      endpoints.showStories
    ])
      .then(data => {
        setTopStory_IDs(data[0])
        setNewStory_IDs(data[1])
        setAskStory_IDs(data[2])
        setJobStory_IDs(data[3])
        setShowStory_IDs(data[4])
      })
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
  if (loading) { return <div className='App_loading'>App is Loading...</div>}
  return (
    <Switch className='App_rendered'>
      <Route exact path='/' render={ (props) => <DynamicView {...props} key={Date.now()} DynamicClassName='TopStories' IDs={topStory_IDs}/> }/>
      <Route exact path='/newest' render={ (props) => <DynamicView {...props} key={Date.now()} DynamicClassName='NewStories' IDs={newStory_IDs}/> }/>
      <Route exact path='/ask' render={ (props) => <DynamicView {...props} key={Date.now()} DynamicClassName='AskStories' IDs={askStory_IDs}/> }/>
      <Route exact path='/show' render={ (props) => <DynamicView {...props} key={Date.now()} DynamicClassName='ShowStories' IDs={showStory_IDs}/> }/>
      <Route exact path='/jobs' render={ (props) => <DynamicView {...props} key={Date.now()} DynamicClassName='JobStories' IDs={jobStory_IDs}/> }/>
    </Switch>
  )
}

// EXPORT
export default App;