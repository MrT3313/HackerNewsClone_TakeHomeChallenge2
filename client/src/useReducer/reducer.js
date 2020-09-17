// IMPORTS
import actions from './actions.js'

export default function reducer(state, action) {
// console.log('THIS IS THE ACTION', action)
// -- //
    switch(action.type) {
        // IDs
        case actions.setTopStory_IDs:
            return { ...state, topStory_IDs: action.value }
        case actions.setNewStory_IDs:
            return { ...state, newStory_IDs: action.value }
        case actions.setAskStory_IDs:
            return { ...state, askStory_IDs: action.value }
        case actions.setJobStory_IDs:
            return { ...state, jobStory_IDs: action.value }
        case actions.setShowStory_IDs:
            return { ...state, showStory_IDs: action.value }

        default: 
            return state
    }
}