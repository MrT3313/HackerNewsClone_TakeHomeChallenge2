export default function reducer(state, action) {
// console.log('THIS IS THE ACTION', action)
// -- //
    switch(action.type) {
        case 'setTopStory_IDs':
            return { ...state, topStory_IDs: action.value}
        default: 
            return state
    }
}