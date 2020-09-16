// IMPORTS
import React from 'react';
import { NavLink } from "react-router-dom";

// COMPONENTS

// LOGOS
import YCombinatorLogo from '../assets/YCombinatorLogo.svg'

// STYLES
import '../styles/NavBar.css'

// __MAIN__ 
function NavBar() {
  return (
      <div className='NavBar'>
        <div className='Nav_LEFT'>
            <NavLink 
                className='NavItem TitleCard'
                to='/'
            >
                <img
                    className='Logo'
                    src={YCombinatorLogo} alt='Y Combinator Logo'
                    width='18px'
                    height='18px'
                    background='white'
                />
                <div className='Title'>
                    Hacker News
                </div>
            </NavLink>
            <NavLink to='/newest' className='NavItem' activeClassName="ActiveNavLink">new</NavLink>
            <div className='NavPipe'>|</div>
            <NavLink to='/past' className='NavItem'>past</NavLink>
            <div className='NavPipe'>|</div>
            <NavLink to='/newcomments' className='NavItem' activeClassName="ActiveNavLink">comments</NavLink>
            <div className='NavPipe'>|</div>
            <NavLink to='/ask' className='NavItem' activeClassName="ActiveNavLink">ask</NavLink>
            <div className='NavPipe'>|</div>
            <NavLink to='/show' className='NavItem' activeClassName="ActiveNavLink">show</NavLink>
            <div className='NavPipe'>|</div>
            <NavLink to='/jobs' className='NavItem' activeClassName="ActiveNavLink">jobs</NavLink>
            <div className='NavPipe'>|</div>
            {/* TODO: Private Route */}
            <NavLink to='/submit' className='NavItem' activeClassName="ActiveNavLink">submit</NavLink>
        </div>
        <div className='Nav_RIGHT'>
            {/* TODO: Private Route => returns to previous page before clicking login */}
            <NavLink to='/login' className='NavItem' activeClassName="ActiveNavLink">login</NavLink>
        </div>
      </div>
  );
}

export default NavBar;