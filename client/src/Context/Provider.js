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