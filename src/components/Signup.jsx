import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";
import "../styles/Signup.css";
import logo from "../assets/almora-logo.png";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    /* ---------- BASIC VALIDATION ---------- */
    if (!name || !email || !password || !confirmPassword || !role) {
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

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      triggerShake();
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      triggerShake();
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
      });

      navigate("/dashboard");
    } catch (err) {
      console.log("Firebase signup error:", err.code);

      switch (err.code) {
        case "auth/email-already-in-use":
          setError("An account with this email already exists.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please try again.");
          break;
        default:
          setError("Signup failed. Please try again.");
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
          <h1>Create Account</h1>
          <p>Sign up to get started</p>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          <label>Role</label>
          <div className="toggle-container">
            <button
              type="button"
              className={`toggle-button ${role === "student" ? "active" : ""}`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
            <button
              type="button"
              className={`toggle-button ${role === "alumni" ? "active" : ""}`}
              onClick={() => setRole("alumni")}
            >
              Alumni
            </button>
          </div>

          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="signup-error">{error}</p>}

          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/">
              <span>Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
