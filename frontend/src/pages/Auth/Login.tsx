import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import useLogin from "src/api/useLogin";
import useFetchProfile from "src/api/useFetchProfile";

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin();
  const fetchProfile = useFetchProfile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginResult = await login({ email, password });

    if (loginResult) {
      fetchProfile(loginResult.token);
    }
  };

  return (
    <div className="login-container">
      <h2 className="title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={!password || !emailRegex.test(email)}
        >
          Login
        </button>
      </form>
      <div className="form-footer">
        <p>
          Don't have an account?
          <Link to="/auth/signup" className="navigate-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
