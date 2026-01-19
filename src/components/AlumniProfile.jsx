import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateAlumni } from "../services/firestore";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../components/firebase";
import "../styles/Profile.css";

const AlumniProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [qualification, setQualification] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [domain, setDomain] = useState("");
  const [about, setAbout] = useState("");
  const [yearOfPassing, setYearOfPassing] = useState("");
  const [marksheet, setMarksheet] = useState(null);
  const [leavingCert, setLeavingCert] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!currentUser) {
      setError("You must be logged in.");
      triggerShake();
      return;
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !qualification ||
      !marksheet ||
      !leavingCert
    ) {
      setError("Please fill all required fields.");
      triggerShake();
      return;
    }

    try {
      setLoading(true);

      const marksheetRef = ref(
        storage,
        `marksheets/${currentUser.uid}/${marksheet.name}`
      );
      await uploadBytes(marksheetRef, marksheet);
      const marksheetURL = await getDownloadURL(marksheetRef);

      const leavingRef = ref(
        storage,
        `leavingCerts/${currentUser.uid}/${leavingCert.name}`
      );
      await uploadBytes(leavingRef, leavingCert);
      const leavingCertURL = await getDownloadURL(leavingRef);

      const profileData = {
        firstName,
        lastName,
        email,
        phone,
        linkedin,
        github,
        portfolio,
        company,
        designation: role,
        experience: parseInt(experience),
        domain,
        about,
        qualification,
        yearOfPassing,
        marksheet: marksheetURL,
        leavingCert: leavingCertURL,
      };

      await updateAlumni(currentUser.uid, profileData);

      alert("Alumni profile saved successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to save profile.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className={`profile-card ${shake ? "shake" : ""}`}>
        <h2>Alumni Profile</h2>
        <p className="subtitle">Complete your professional details</p>

        <form onSubmit={handleSubmit}>
          {/* BASIC INFO */}
          <div className="section">
            <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          {/* EXPERIENCE */}
          <div className="section">
            <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
            <input placeholder="Designation" value={role} onChange={e => setRole(e.target.value)} />
            <input type="number" placeholder="Experience" value={experience} onChange={e => setExperience(e.target.value)} />
          </div>

          {/* DOMAIN */}
          <div className="section">
            <input placeholder="Domain" value={domain} onChange={e => setDomain(e.target.value)} />
          </div>

          {/* ABOUT */}
          <div className="section">
            <textarea placeholder="About" value={about} onChange={e => setAbout(e.target.value)} />
          </div>

          {/* QUALIFICATION */}
          <div className="section">
            <select value={qualification} onChange={e => setQualification(e.target.value)}>
              <option value="">Select Qualification</option>
              <option value="diploma">Diploma</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>

            <input placeholder="Year of Passing" value={yearOfPassing} onChange={e => setYearOfPassing(e.target.value)} />
            <input type="file" onChange={e => setMarksheet(e.target.files[0])} />
            <input type="file" onChange={e => setLeavingCert(e.target.files[0])} />
          </div>

          {error && <p className="profile-error">{error}</p>}

          {/* ✅ SUBMIT BUTTON — THIS WAS MISSING */}
          <button className="save-btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlumniProfile;
