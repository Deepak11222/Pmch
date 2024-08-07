import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("storeAuthToken")) {
      history.push("/storeadmin/dashboard");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/store/login",
        { email, password, rememberMe },
        config
      );

      localStorage.setItem("storeAuthToken", data.token);
      // console.log(data)
      localStorage.setItem("Email", email)
      history.push(`/storeadmin/dashboard/${email}`);
      window.location.reload(); // Trigger a refresh after login
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <div className="loginlogo">
          <a href="https://seduloussoftech.com/PMCH/">
            <img
              src="https://seduloussoftech.com/PMCH/assets/img/logo.png"
              alt="pmch"
            />
          </a>
        </div>
        <p className="login-box-msg">Store Admin</p>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <div className="input-group mb-3">
            <input
              className="login-inputbox form-control"
              type="email"
              required
              id="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              tabIndex={1}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group mb-3">
            <input
              className="login-inputbox form-control"
              type="password"
              required
              id="password"
              autoComplete="true"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              tabIndex={2}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;