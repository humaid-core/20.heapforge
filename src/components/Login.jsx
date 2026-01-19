import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";
import logo from "../assets/almora-logo.png";
import eye from "../assets/eye.svg";
import eyeSlash from "../assets/eye-slash.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signup-container">
      <div className="signup-card">

        <div className="logo-section">
          <img src={logo} alt="Almora Logo" />
          <h1>Welcome Back</h1>
          <p>Login to your account</p>
        </div>

        <form className="signup-form">

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
            />
            <img
              src={showPassword ? eyeSlash : eye}
              alt="toggle"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <button className="signup-btn">Login</button>

          <p className="login-text">
            <span>Forgot Password?</span>
          </p>

          <p className="login-text">
            Don’t have an account?{" "}
            <Link to="/signup"><span>Sign up</span></Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
