import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector, } from 'react-redux';
import { Redirect } from 'react-router-dom';

function ProfilePage() {  
  const sessionUser = useSelector(state => state.session.user);
  const sessionLogs = useSelector(state => state.session.logs);
  const user = sessionUser;
  const dispatch = useDispatch();

  const [logs, setLogs] = useState();
  const [userId, setuserId] = useState(user.id);

  if (!sessionLogs) {
    dispatch(sessionActions.getLogs({ userId }))
  }
  
  const showLogs = (e) => {
    e.preventDefault();
   setLogs(JSON.stringify(sessionLogs["logs"]))
  }  

  return (
    <div>
     <div>
      <p className="text-xl p-3 mt-2">user: {user.username}</p>
     </div>
     <div>
       <button onClick={showLogs} className="bg-neutral-800  hover:bg-neutral-500 text-white font-bold py-1 px-3 rounded text-sm mx-4 mb-3">Show Logs</button>
     </div>
     <div>
       <p>{logs}</p>
     </div>
   </div>
  );
}

export default ProfilePage;