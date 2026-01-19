import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";
import logo from "../assets/almora-logo.png";
import eye from "../assets/eye.svg";
import eyeSlash from "../assets/eye-slash.svg";

const Signup = () => {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="signup-container">
      <div className="signup-card">

        <div className="logo-section">
          <img src={logo} alt="Almora Logo" />
          <h1>Create Account</h1>
          <p>Join the Almora community</p>
        </div>

        <div className={`role-switch ${role === "mentor" ? "mentor" : ""}`}>
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => setRole("student")}
          >
            Student
          </button>
          <button
            className={role === "mentor" ? "active" : ""}
            onClick={() => setRole("mentor")}
          >
            Alumni
          </button>
        </div>

        <form className="signup-form">

          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
            />
            <img
              src={showPassword ? eyeSlash : eye}
              alt="toggle"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <label>Confirm Password</label>
          <div className="password-field">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter password"
            />
            <img
              src={showConfirm ? eyeSlash : eye}
              alt="toggle"
              onClick={() => setShowConfirm(!showConfirm)}
            />
          </div>

          <button className="signup-btn">Create Account</button>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/"><span>Login</span></Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;
