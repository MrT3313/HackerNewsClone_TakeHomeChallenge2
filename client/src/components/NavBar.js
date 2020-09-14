// IMPORTS
import React from 'react';

// COMPONENTS

// LOGOS
import HN_Logo from '../assets/HN_logo.svg'

// STYLES
import '../styles/NavBar.css'

// __MAIN__ 
function NavBar() {
  return (
      <div className='NavBar'>
        <div className='Nav_LEFT'>
            <div className='NavItem TitleCard'>
                <img
                    src={HN_Logo}
                    background='white'
                />
                <div className='Title'>
                    HackerNews
                </div>
            </div>
            <div className='NavItem'>new</div>
            <div className='NavItem'>past</div>
            <div className='NavItem'>comments</div>
            <div className='NavItem'>ask</div>
            <div className='NavItem'>show</div>
            <div className='NavItem'>jobs</div>
            <div className='NavItem'>submit</div>
        </div>
        <div className='Nav_RIGHT'>
            <div className='NavItem'>
                login
            </div>
        </div>
      </div>
  );
}

export default NavBar;