// IMPORTS
import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom'

// COMPONENTS
import Homepage from './views/Homepage.jsx'
import Newest from './views/Newest.jsx'

// // CONTEXT
import GlobalContext from './Context/GlobalContext.js'

// ENDPOINTS
import endpoints from './utils/endpoints.js'

// __MAIN__ 
function App() {
  // Context
  const { 
    topStory_IDs, setTopStory_IDs,
    storyData, setStoryData,
  } = useContext(GlobalContext)

  // State
  const [loading, isLoading] = useState(true)

  // useEFFECT
  useEffect(() => {
    console.log('FIRST USE EFFECT')
    // get top story IDs
    fetch(`${endpoints.HN_BASE_URL}${endpoints.topStories}`)
      .then(response => response.json())
      .then(data => {
        // set top story IDs
        setTopStory_IDs(data.slice(0,100))
      })
      console.log('end - FIRST USE EFFECT')
    }, [])
    
    useEffect(() => {
      console.log('SECOND USE EFFECT')
      // Async Function
      async function GET_itemDataFromList() {
        let newStoryData = {}

        for (const [idx, itemID] of topStory_IDs.entries()) {
          // Setup URL
          const url = `${endpoints.HN_BASE_URL}${endpoints.item}${itemID}.json`
          // Get Data
          const data = await fetch(url)
            .then(storyData => storyData.json())
            .catch(err => console.log(err))
          // Update Prep Object
          newStoryData[data.id] = data
          newStoryData[data.id].idx = idx
        }
        return newStoryData
      }
      if ( topStory_IDs.length !== 0) {
        GET_itemDataFromList()
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