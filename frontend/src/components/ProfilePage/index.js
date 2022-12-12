import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector, } from 'react-redux';
import { Redirect } from 'react-router-dom';

function ProfilePage() {  
  const sessionUser = useSelector(state => state.session.user);
  const sessionLogs = useSelector(state => state.session.logs);
  const user = sessionUser;
  const dispatch = useDispatch();

  const [logs, setLogs] = useState("");
  const [userId, setuserId] = useState(user.id);

  const setLog = () => {
    return 
  }
  const showLogs = async(e) => {
    e.preventDefault();
    await dispatch(sessionActions.getLogs({ userId }))
    await setLog()
  }  

  return (
    <div>
     <div>
      <p>Hello {user.username}</p>
      <p>Hello {JSON.stringify(user)}</p>
     </div>
     <div>
       <button onClick={showLogs}>Show Logs</button>
     </div>
     <div>
       <p>{logs}</p>
     </div>
   </div>
  );
}

export default ProfilePage;