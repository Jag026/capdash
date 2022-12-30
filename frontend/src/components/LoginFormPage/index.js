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
    <form onSubmit={handleSubmit} className="flex flex-col m-8 mt-20 text-xl mx-20">
      <ul className="text-white mb-10">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className="text-white">
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          className="ml-4 text-black p-1"
        />
      </label>
      <label className="mt-8 text-white">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="ml-4 text-black p-1"
        />
      </label>
      <button type="submit" className="bg-white mt-8 w-20 text-black">Log In</button>
    </form>
  );
}

export default LoginFormPage;