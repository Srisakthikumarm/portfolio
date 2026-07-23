import React from "react";
import "../styles/Education.css";
import FadeInSection from "./FadeInSection";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

const Education = () => {
  const educationData = [
    {
      type: "Academic Degree",
      title: "B.Sc. Computer Science",
      institution: "Gobi Arts & Science College, Erode",
      duration: "June 2021 – May 2024",
      grade: "CGPA: 7.35 / 10",
      highlights: [
        "NSS Volunteer",
        "Event & Technical Competition Organiser",
        "Industrial Visit Organiser (50+ students)",
      ],
      icon: <SchoolRoundedIcon style={{ color: "#00E5FF" }} />,
    },
    {
      type: "Professional Certification",
      title: "UI/UX & Graphic Design Certification",
      institution: "Fortune Innovative",
      duration: "June 2024 – March 2025",
      grade: "Certified Professional",
      highlights: [
        "Figma & Adobe Creative Suite",
        "End-to-End UX Process & Design Thinking",
        "Visual & Interaction Design System Development",
      ],
      icon: <WorkspacePremiumRoundedIcon style={{ color: "#A259FF" }} />,
    },
  ];

  return (
    <div id="education">
      <FadeInSection>
        <div className="section-header">
          <div className="section-title">
            <span className="section-title-prefix">04.</span>
            <span>Education & Credentials</span>
          </div>
        </div>
        <div className="education-grid">
          {educationData.map((item, index) => (
            <FadeInSection key={index} delay={`${(index + 1) * 150}ms`}>
              <div className="education-card">
                <div className="card-header-row">
                  <div className="edu-icon">{item.icon}</div>
                  <div className="edu-badge">{item.type}</div>
                </div>
                <h3 className="edu-title">{item.title}</h3>
                <h4 className="edu-institution">{item.institution}</h4>
                <div className="edu-meta">
                  <span className="edu-duration">{item.duration}</span>
                  <span className="edu-grade">{item.grade}</span>
                </div>
                <ul className="edu-highlights">
                  {item.highlights.map((point, pIdx) => (
                    <li key={pIdx}>{point}</li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          ))}
        </div>
      </FadeInSection>
    </div>
  );
};

export default Education;
