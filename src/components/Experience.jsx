import React from "react";
import JobList from "./JobList";
import "../styles/Experience.css";
import FadeInSection from "./FadeInSection";

const Experience = () => {
  return (
    <div id="experience">
      <FadeInSection delay="0s">
        <div className="section-header">
          <span className="section-number">02</span>
          <span className="section-title">WORK EXPERIENCE</span>
        </div>
      </FadeInSection>
      
      <FadeInSection delay="0.2s">
        <div className="experience-card-wrap">
          <JobList />
        </div>
      </FadeInSection>
    </div>
  );
};

export default Experience;
