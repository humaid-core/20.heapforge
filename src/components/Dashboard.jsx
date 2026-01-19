import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../components/firebase";
import { getUser } from "../services/firestore";  // Import from firestore.js
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const data = await getUser(currentUser.uid);
        setUserData(data);
      };
      fetchUserData();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Dashboard</h1>
      {currentUser && userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;