// IMPORTS
import actions from './actions.js'

export default function reducer(state, action) {
console.log('THIS IS THE ACTION', action)
// -- //
    switch(action.type) {
        // IDs
        case actions.setTopStory_IDs:
            return { ...state, topStory_IDs: action.value }
        case actions.setNewStory_IDs:
            return { ...state, newStory_IDs: action.value }
        // Story Data
        case actions.setStoryData:
            return { 
                ...state, 
                storyData: {
                    // ...state.storyData, [action.value.id]: action.value
                    ...state.storyData, ...action.value,
                    // ...action.value,
                }
            }

        default: 
            return state
    }
}