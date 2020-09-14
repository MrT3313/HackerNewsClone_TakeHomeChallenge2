// IMPORTS
import React from 'react';
import { Route } from 'react-router-dom'

// COMPONENTS
import Homepage from './views/Homepage.jsx'
import Newest from './views/Newest.jsx'

// __MAIN__ 
function App() {
  return (
    <div className='App'>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/newest' component={Newest} />
    </div>
  );
}

export default App;