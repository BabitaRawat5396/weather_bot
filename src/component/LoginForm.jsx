import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../state_management/service/operations/loginOperations";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(login({ name: username }, navigate));
  }

  return (
    <div className="login">
      <h1>Weather Bot</h1>
      <h3>Welcome to Weather Bot</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Enter you username . . ."
            required
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default LoginForm;
