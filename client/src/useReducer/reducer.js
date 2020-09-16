// IMPORTS
import actions from './actions.js'

export default function reducer(state, action) {
console.log('THIS IS THE ACTION', action)
// -- //
    switch(action.type) {
        case actions.setTopStory_IDs:
            return { ...state, topStory_IDs: action.value}
        case actions.setStoryData:
            return { 
                ...state, 
                storyData: {
                    // ...state.storyData, [action.value.id]: action.value
                    // ...state.storyData, ...action.value,
                    ...action.value,
                }
            }
        default: 
            return state
    }
}