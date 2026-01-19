import React, { useState } from "react";
import "../styles/Profile.css";

const AlumniProfile = () => {
  const [qualification, setQualification] = useState("");

  return (
    <div className="profile-container">
      <div className="profile-card">

        <h2>Alumni Profile</h2>
        <p className="subtitle">Complete your professional details</p>

        {/* BASIC INFO */}
        <div className="section">
          <h3>Basic Information</h3>
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Phone Number" required />
        </div>

        {/* PROFESSIONAL LINKS */}
        <div className="section">
          <h3>Professional Profiles</h3>
          <input type="text" placeholder="LinkedIn Profile URL" required />
          <input type="text" placeholder="GitHub Profile URL" required />
          <input type="text" placeholder="Portfolio Website (optional)" />
        </div>

        {/* EXPERIENCE */}
        <div className="section">
          <h3>Current Experience</h3>
          <input type="text" placeholder="Company Name" required />
          <input type="text" placeholder="Role / Designation" required />
          <input type="number" placeholder="Years of Experience" required />
          
        </div>

        {/* DOMAIN */}
        <div className="section">
          <h3>Domain / Expertise</h3>
          <input
            type="text"
            placeholder="e.g. Web Development, AI, Data Science"
            required
          />
        </div>

        {/* ABOUT */}
        <div className="section">
          <h3>About You</h3>
          <textarea
            rows="4"
            placeholder="Describe your engineering journey, work experience, achievements..."
            required
          />
        </div>

        {/* QUALIFICATION */}
        <div className="section">
          <h3>Highest Qualification</h3>

          <select
            value={qualification}
            required
            onChange={(e) => setQualification(e.target.value)}
          >
            <option value="">Select Qualification</option>
            <option value="diploma">Diploma</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="postgraduate">Postgraduate</option>
          </select>

          {qualification && (
            <div className="sub-section">

              <input
                type="text"
                placeholder="Year of Passing"
                required
              />

              <small>Upload Marksheet / Provisional Certificate</small>
              <input type="file" required />

              <small>Upload Leaving Certificate</small>
              <input type="file" required />
            </div>
          )}
        </div>

        {/* SAVE */}
        <button className="save-btn" type="submit">
          Save Profile
        </button>

      </div>
    </div>
  );
};

export default AlumniProfile;
