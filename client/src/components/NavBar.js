// IMPORTS
import React from 'react';
import { NavLink } from "react-router-dom";

// LOGOS
import YCombinatorLogo from '../assets/YCombinatorLogo.svg'

// STYLES
import '../styles/NavBar.css'

// __MAIN__ 
function NavBar() {
  return (
      <div className='NavBar' data-testid='NavBar'>
        <div className='Nav_LEFT'>
            <NavLink 
                className='NavItem TitleCard' data-testid='NavTo_HOME'
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
            <NavLink 
                className='NavItem' data-testid='NavTo_NEW' activeClassName="ActiveNavLink"
                to='/newest' 
            >new</NavLink>
            <div className='NavPipe'>|</div>
            <NavLink 
                className='NavItem' data-testid='NavTo_PAST' activeClassName="ActiveNavLink"
                to='/past' 
            >past</NavLink>
            <div className='NavPipe'>|</div>
            <NavLink 
                className='NavItem' data-testid='NavTo_COMMENTS' activeClassName="ActiveNavLink"
                to='/newcomments' 
            >comments</NavLink>
            <div className='NavPipe'>|</div>
            <NavLink 
                className='NavItem' data-testid='NavTo_ASK' activeClassName="ActiveNavLink"
                to='/ask' 
            >ask</NavLink>
            <div className='NavPipe'>|</div>
            <NavLink 
                className='NavItem' data-testid='NavTo_SHOW' activeClassName="ActiveNavLink"
                to='/show' 
            >show</NavLink>
            <div className='NavPipe'>|</div>
            <NavLink 
                className='NavItem' data-testid='NavTo_JOBS' activeClassName="ActiveNavLink"
                to='/jobs' 
            >jobs</NavLink>
            <div className='NavPipe'>|</div>
            <NavLink 
                className='NavItem' data-testid='NavTo_SUBMIT' activeClassName="ActiveNavLink"
                to='/submit' 
            >submit</NavLink>
        </div>
        <div className='Nav_RIGHT'>
            <NavLink to='/login' className='NavItem' activeClassName="ActiveNavLink">login</NavLink>
        </div>
      </div>
  );
}

export default NavBar;