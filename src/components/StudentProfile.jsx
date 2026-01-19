import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateStudent } from "../services/firestore";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../components/firebase";
import "../styles/Profile.css";

const StudentProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [passoutYear, setPassoutYear] = useState("");
  const [year, setYear] = useState("");
  const [hasKT, setHasKT] = useState("");
  const [ktCount, setKtCount] = useState("");
  const [internship, setInternship] = useState("");
  const [internCompany, setInternCompany] = useState("");
  const [internRole, setInternRole] = useState("");
  const [internDuration, setInternDuration] = useState("");
  const [domain, setDomain] = useState("");
  const [skills, setSkills] = useState("");
  const [admissionProof, setAdmissionProof] = useState(null);

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
      setError("You must be logged in to save your profile.");
      triggerShake();
      return;
    }

    if (
      !firstName ||
      !lastName ||
      !admissionYear ||
      !passoutYear ||
      !year ||
      !hasKT ||
      !domain ||
      !skills ||
      !admissionProof
    ) {
      setError("Please fill in all required fields.");
      triggerShake();
      return;
    }

    try {
      setLoading(true);

      /* Upload admission proof */
      const fileRef = ref(
        storage,
        `admissionProofs/${currentUser.uid}/${admissionProof.name}`
      );
      await uploadBytes(fileRef, admissionProof);
      const admissionProofURL = await getDownloadURL(fileRef);

      /* 🔥 ONLY PROFILE DATA */
      const profileData = {
        firstName,
        lastName,
        admissionYear: parseInt(admissionYear),
        passoutYear: parseInt(passoutYear),
        currentYear: year,
        hasKT,
        ktCount: hasKT === "yes" ? parseInt(ktCount) : 0,
        internship,
        internCompany: internship === "yes" ? internCompany : null,
        internRole: internship === "yes" ? internRole : null,
        internDuration: internship === "yes" ? internDuration : null,
        domain,
        skills: skills.split(",").map((s) => s.trim()),
        admissionProof: admissionProofURL,
      };

      await updateStudent(currentUser.uid, profileData);

      alert("Student profile saved successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Student profile error:", err);
      setError("Failed to save profile. Please try again.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className={`profile-card ${shake ? "shake" : ""}`}>
        <h2>Student Profile</h2>
        <p className="subtitle">Complete your academic profile</p>

        <form onSubmit={handleSubmit}>
          {/* BASIC INFO */}
          <div className="section">
            <h3>Basic Information</h3>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Admission Year"
              value={admissionYear}
              onChange={(e) => setAdmissionYear(e.target.value)}
            />
            <input
              type="number"
              placeholder="Expected Passout Year"
              value={passoutYear}
              onChange={(e) => setPassoutYear(e.target.value)}
            />
          </div>

          {/* ACADEMICS */}
          <div className="section">
            <h3>Academic Details</h3>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Current Year</option>
              <option value="fe">First Year</option>
              <option value="se">Second Year</option>
              <option value="te">Third Year</option>
              <option value="be">Final Year</option>
            </select>

            <select value={hasKT} onChange={(e) => setHasKT(e.target.value)}>
              <option value="">Any KTs?</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>

            {hasKT === "yes" && (
              <input
                type="number"
                placeholder="Number of KTs"
                value={ktCount}
                onChange={(e) => setKtCount(e.target.value)}
              />
            )}
          </div>

          {/* INTERNSHIP */}
          <div className="section">
            <h3>Internship</h3>
            <select
              value={internship}
              onChange={(e) => setInternship(e.target.value)}
            >
              <option value="">Internship done?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {internship === "yes" && (
              <>
                <input
                  type="text"
                  placeholder="Company"
                  value={internCompany}
                  onChange={(e) => setInternCompany(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={internRole}
                  onChange={(e) => setInternRole(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={internDuration}
                  onChange={(e) => setInternDuration(e.target.value)}
                />
              </>
            )}
          </div>

          {/* DOMAIN */}
          <div className="section">
            <h3>Domain</h3>
            <select value={domain} onChange={(e) => setDomain(e.target.value)}>
              <option value="">Select Domain</option>
              <option value="web">Web Development</option>
              <option value="aiml">AI / ML</option>
              <option value="data">Data Science</option>
              <option value="cyber">Cyber Security</option>
            </select>
          </div>

          {/* SKILLS */}
          <div className="section">
            <h3>Skills</h3>
            <input
              type="text"
              placeholder="HTML, CSS, JavaScript"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          {/* PROOF */}
          <div className="section">
            <h3>Admission Proof</h3>
            <input
              type="file"
              onChange={(e) => setAdmissionProof(e.target.files[0])}
            />
          </div>

          {error && <p className="profile-error">{error}</p>}

          <button className="save-btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
