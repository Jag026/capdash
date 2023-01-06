import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div>
     <h2 className="text-white mt-20 text-6xl mx-20">Login <a href="/signup" className="text-blue-600 text-xl mx-4">Or Click Here To Sign Up</a></h2>
     <form onSubmit={handleSubmit} className="flex flex-col text-xl mx-20">
      <ul className="text-white mb-10">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className="text-white">
        <span className="text-4xl">Username or Email</span>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          className="ml-4 text-black p-1"
        />
      </label>
      <label className="mt-8 text-white">
        <span className="text-4xl">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="ml-4 text-black p-1"
        />
      </label>
      <button type="submit" className="text-white bg-blue-7 mt-8 w-40 text-3xl p-3">Log In</button>
     </form>
    </div>
  );
}

export default LoginFormPage;