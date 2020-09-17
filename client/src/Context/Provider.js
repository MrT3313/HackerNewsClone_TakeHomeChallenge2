// IMPORTS
import React, { useReducer } from 'react'

// useReducer
import initialState from '../useReducer/initialState.js'
import actions from '../useReducer/actions.js'
import reducer from '../useReducer/reducer.js'

// CONTEXT
import GlobalContext from '../Context/GlobalContext.js'

// EXPORTS
export default function({children}) {
    // useREDUCER
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const value = {
        // - 1 - // Global Variables
        maxPerPage: state.maxPerPage,
        // - 2 - // IDs
        // Top Stories
        topStory_IDs: state.topStory_IDs,
        setTopStory_IDs: storyIDs => {
          dispatch({ 
              type: actions.setTopStory_IDs, 
              value: storyIDs
          })
        },
        // New Stories
        newStory_IDs: state.newStory_IDs,
        setNewStory_IDs: storyIDs => {
            dispatch({ 
                type: actions.setNewStory_IDs, 
                value: storyIDs
            })
        },
        // Ask Stories
        askStory_IDs: state.askStory_IDs,
        setAskStory_IDs: storyIDs => {
            dispatch({ 
                type: actions.setAskStory_IDs, 
                value: storyIDs
            })
        },
        // Job Stories
        jobStory_IDs: state.jobStory_IDs,
        setJobStory_IDs: storyIDs => {
            dispatch({ 
                type: actions.setJobStory_IDs, 
                value: storyIDs
            })
        },
        // Show Stories
        showStory_IDs: state.showStory_IDs,
        setShowStory_IDs: storyIDs => {
            dispatch({ 
                type: actions.setShowStory_IDs, 
                value: storyIDs
            })
        },

        // - 3 - // Data Storage
        // Story Data
        storyData: state.storyData,
        setStoryData: storyData => {
            dispatch({
                type: actions.setStoryData,
                value: storyData
            })
        },
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}