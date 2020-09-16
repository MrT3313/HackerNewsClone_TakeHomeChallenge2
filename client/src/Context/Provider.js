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
        topStory_IDs: state.topStory_IDs,
        setTopStory_IDs: storyIDs => {
        dispatch({ 
            type: actions.setTopStory_IDs, 
            value: storyIDs
        })
        },
        
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