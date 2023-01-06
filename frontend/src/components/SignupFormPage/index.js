import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };
  return (
    <div>
     <h2 className="text-white mt-20 text-6xl mx-20">Sign Up <a href="/login" className="text-blue-600 text-xl mx-4">Or Click Here To Login</a></h2>
     <form onSubmit={handleSubmit} className="mt-20 mx-20 text-xl">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className="text-white flex flex-col">
      <label className="m-3">
        <span className="text-4xl">Email</span>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="ml-4 text-black p-1"
        />
      </label>
      <label className="m-3">
        <span className="text-4xl">Username</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="ml-4 text-black p-1"
        />
      </label>
      <label className="m-3">
        <span className="text-4xl">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="ml-4 text-black p-1"
        />
      </label>
      <label className="m-3">
        <span className="text-4xl">Confirm Password</span>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="ml-4 text-black p-1"
        />
      </label>
      </div>
      <button type="submit" className="text-white bg-blue-7 mt-8 w-40 text-3xl p-3">Sign Up</button>
     </form>
    </div>
  );
}

export default SignupFormPage;