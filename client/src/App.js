// IMPORTS
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom'

// COMPONENTS
import Homepage from './views/Homepage.jsx'
import Newest from './views/Newest.jsx'

// CONTEXT
import GlobalContext from './Context/GlobalContext.js'

// useReducer
import initialState from './useReducer/initialState.js'
import actions from './useReducer/actions.js'
import reducer from './useReducer/reducer.js'

// __MAIN__ 
function App() {
  const [ state, dispatch ] = React.useReducer(reducer, initialState)
  const value = {
    topStory_IDs: state.topStory_IDs,
    setTopStory_IDs: data => {
      dispatch({ 
        type: actions.setTopStory_IDs, 
        value: data
      })
    }
  }

  // Return
  return (
    <GlobalContext.Provider value={value}>
      <Switch className='App'>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/newest' component={Newest} />
      </Switch>
    </GlobalContext.Provider>
  );
}

export default App;