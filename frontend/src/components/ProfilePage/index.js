import React from 'react';
import { useSelector } from 'react-redux';


function ProfilePage() {  
  const sessionUser = useSelector(state => state.session.user);
    const user = sessionUser;
    
  return (
       <div>
      <p>Hello {user.username}</p>
      <p>Hello {JSON.stringify(user)}</p>
     </div>
  );
}

export default ProfilePage;