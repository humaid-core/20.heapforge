import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { getUser } from "../services/firestore";
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

    if (!email || !password) {
      setError("Please fill in all fields.");
      triggerShake();
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      // 🔥 FIRESTORE USER DATA
      const userData = await getUser(uid);

      if (!userData) {
        setError("User profile not found. Please complete signup.");
        triggerShake();
        return;
      }

      // ✅ ROUTING LOGIC
      if (userData.profileCompleted) {
        navigate("/dashboard");
      } else {
        if (userData.role === "student") {
          navigate("/student/profile");
        } else if (userData.role === "alumni") {
          navigate("/alumni/profile");
        } else {
          navigate("/dashboard");
        }
      }

    } catch (err) {
      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
          setError("Invalid email or password.");
          break;
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Try later.");
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
              alt="toggle"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>

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
