import React from "react";
import JobList from "./JobList";
import "../styles/Experience.css";
import FadeInSection from "./FadeInSection";

const Experience = () => {
  return (
    <div id="experience">
      <FadeInSection>
        <div className="section-header">
          <span className="section-number">03</span>
          <span className="section-title">WORK EXPERIENCE</span>
        </div>
        <div className="experience-card-wrap">
          <JobList />
        </div>
      </FadeInSection>
    </div>
  );
};

export default Experience;
