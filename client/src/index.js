// IMPORTS
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

// CONTEXT
import ContextProvider from './Context/Provider.js'

// COMPONENTS
import App from './App';

// STYLES
import './styles/index.css'

// RENDER
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);