import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // untouched
import "../styles/Signup.css";
import logo from "../assets/almora-logo.png";
import eye from "../assets/eye.svg";
import eyeSlash from "../assets/eye-slash.svg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    /* ---------- BASIC VALIDATION ---------- */
    if (!email || !password) {
      setError("Please fill in all fields.");
      triggerShake();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      triggerShake();
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      navigate("/dashboard");

    } catch (err) {
      console.log("Firebase error:", err.code);

      switch (err.code) {
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/user-not-found":
          setError("No account found with this email.");
          break;

        case "auth/user-disabled":
          setError("This account has been disabled.");
          break;

        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your connection.");
          break;

        default:
          setError("Login failed. Please try again.");
      }

      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className={`signup-card ${shake ? "shake" : ""}`}>
        <div className="logo-section">
          <img src={logo} alt="Almora Logo" />
          <h1>Welcome Back</h1>
          <p>Login to your account</p>
        </div>

        <form className="signup-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? eyeSlash : eye}
              alt="toggle password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button
            className="signup-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

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
