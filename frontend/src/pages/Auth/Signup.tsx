import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import useSignup from "src/api/useSignup";
import useFetchProfile from "src/api/useFetchProfile";
import { emailRegex } from "./Login";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const signup = useSignup();
  const fetchProfile = useFetchProfile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signupResult = await signup({ name, email, password });

    if (signupResult) {
      fetchProfile(signupResult.token);
    }
  };

  return (
    <div className="login-container">
      <h2 className="title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <p className="lastUpdated">Must be at least 6 characters</p>
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={
            !name.trim() || password.length < 6 || !emailRegex.test(email)
          }
        >
          Sign Up
        </button>
      </form>
      <div className="form-footer">
        <p>Already have an account?</p>
        <Link to="/auth/login" className="navigate-link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
