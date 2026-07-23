import React from "react";
import JobList from "./JobList";
import "../styles/Experience.css";
import FadeInSection from "./FadeInSection";

const Experience = () => {
  return (
    <div id="experience">
      <FadeInSection>
        <div className="section-header">
          <div className="section-title">
            <span className="section-title-prefix">02.</span>
            <span>Work Experience</span>
          </div>
        </div>
        <div className="experience-card-wrap">
          <JobList />
        </div>
      </FadeInSection>
    </div>
  );
};

export default Experience;
