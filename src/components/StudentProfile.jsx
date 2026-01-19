import React, { useState } from "react";
import "../styles/Profile.css";

const StudentProfile = () => {
  const [year, setYear] = useState("");
  const [hasKT, setHasKT] = useState("");
  const [internship, setInternship] = useState("");

  return (
    <div className="profile-container">
      <div className="profile-card">

        <h2>Student Profile</h2>
        <p className="subtitle">Complete your academic profile</p>

        {/* BASIC INFO */}
        <div className="section">
          <h3>Basic Information</h3>

          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="number" placeholder="Admission Year" required />
          <input type="number" placeholder="Expected Passout Year" required />
        </div>

        {/* ACADEMIC STATUS */}
        <div className="section">
          <h3>Academic Details</h3>

          <select value={year} required onChange={(e) => setYear(e.target.value)}>
            <option value="">Current Year</option>
            <option value="fe">First Year (FE)</option>
            <option value="se">Second Year (SE)</option>
            <option value="te">Third Year (TE)</option>
            <option value="be">Final Year (BE)</option>
            <option value="dse">Direct Second Year (DSE)</option>
          </select>

          <select value={hasKT} required onChange={(e) => setHasKT(e.target.value)}>
            <option value="">Any KTs / Backlogs?</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>

          {hasKT === "yes" && (
            <input type="number" placeholder="Number of KTs" required />
          )}
        </div>

        {/* INTERNSHIP */}
        <div className="section">
          <h3>Internship Experience</h3>

          <select
            value={internship}
            required
            onChange={(e) => setInternship(e.target.value)}
          >
            <option value="">Have you done any internship?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {internship === "yes" && (
            <div className="sub-section">
              <input type="text" placeholder="Company Name" required />
              <input type="text" placeholder="Internship Role" required />
              <input type="text" placeholder="Duration (e.g. 2 months)" required />
            </div>
          )}
        </div>

        {/* DOMAIN */}
        <div className="section">
          <h3>Domain of Interest</h3>
          <select required>
            <option value="">Select Domain</option>
            <option value="web">Web Development</option>
            <option value="aiml">AI / ML</option>
            <option value="data">Data Science</option>
            <option value="cyber">Cyber Security</option>
            <option value="exploring">Exploring / Not Sure Yet</option>
          </select>
        </div>

        {/* SKILLS */}
        <div className="section">
          <h3>Skills</h3>
          <input type="text" placeholder="e.g. HTML, CSS, JavaScript" required />
        </div>

        {/* ADMISSION PROOF */}
        <div className="section">
          <h3>Admission Proof</h3>
          <input type="file" required />
          <small>Upload fee receipt or admission proof</small>
        </div>

        {/* SAVE */}
        <button className="save-btn">Save Profile</button>

      </div>
    </div>
  );
};

export default StudentProfile;
