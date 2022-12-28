import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
   <div>
    <div>
      <button onClick={() => setMenuOpen(!menuOpen)} className="bg-neutral-300"><i class="fa-regular fa-square-chevron-down"></i></button>
      {menuOpen && (
        <ul className="mt-3">
            <li className="py-3 text-xl">
              <NavLink exact to="/" className="bg-neutral-800  hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded m-3">Home</NavLink>
            </li>
            <li className="py-3 text-xl">
              <NavLink exact to="/profile" className="bg-neutral-800  hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded m-3">Asset Logs</NavLink>
            </li>
            <li className="py-3 text-xl">
              <NavLink to="/signup" className="bg-neutral-800  hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded m-3">Sign Up</NavLink>
            </li>
            <li className="py-3 text-xl">
              <NavLink to="/login" className="bg-neutral-800  hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded m-3">Log In</NavLink>
            </li>
          <li>Option 3</li>
        </ul>
      )}
    </div>
   </div>
  );
}

export default Navigation;