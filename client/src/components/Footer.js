// IMPORTS
import React from 'react';

// COMPONENTS


// STYLES
import '../styles/Footer.css'

// __MAIN__ 
function Footer() {
  return (
      <div className='Footer'>
            <div className='Message'>
                Applications are open for YC Winter 2021
            </div>
            <div className='Menu'>
                <div>Guidelines</div>
                <div className='NavPipe'>|</div>
                <div>FAQ</div>
                <div className='NavPipe'>|</div>
                <div>Support</div>
                <div className='NavPipe'>|</div>
                <div>API</div>
                <div className='NavPipe'>|</div>
                <div>Security</div>
                <div className='NavPipe'>|</div>
                <div>Lists</div>
                <div className='NavPipe'>|</div>
                <div>Bookmarklet</div>
                <div className='NavPipe'>|</div>
                <div>Legal</div>
                <div className='NavPipe'>|</div>
                <div>Apply to YC</div>
                <div className='NavPipe'>|</div>
                <div>Contact</div>
            </div>
            <div id='FooterSearch' className='Search' >
                <label htmlFor='FooterSearch' className='SearchLabel'>Search:</label>
                <input></input>
            </div>
      </div>
  )
}

// EXPORTS
export default Footer