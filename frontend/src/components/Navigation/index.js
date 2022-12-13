import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">Log In</NavLink>
        <NavLink to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">Home</NavLink>
        <NavLink exact to="/profile" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">Asset_Logs</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;