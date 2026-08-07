import React from "react";
import "../styles/Education.css";
import FadeInSection from "./FadeInSection";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import AccessibleRoundedIcon from "@mui/icons-material/AccessibleRounded";
import SquareFootRoundedIcon from "@mui/icons-material/SquareFootRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";

const skillCategories = [
  {
    category: "DESIGN & PROTOTYPING",
    icon: (
      <span className="retro-icon-frame coral">
        <PaletteRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
      </span>
    ),
    skills: [
      { name: "Figma", bg: "#F24E1E", color: "#FFFFFF", icon: "❖", iconBg: "#7F1D1D", iconColor: "#FFFFFF" },
      { name: "Framer", bg: "#0055FF", color: "#FFFFFF", icon: "▲", iconBg: "#1E3A8A", iconColor: "#FFFFFF" },
      { name: "Adobe XD", bg: "#FF61F6", color: "#FFFFFF", icon: "Xd", iconBg: "#831843", iconColor: "#FFFFFF" },
      { name: "Photoshop", bg: "#31A8FF", color: "#000000", icon: "Ps", iconBg: "#0369A1", iconColor: "#FFFFFF" },
      { name: "Illustrator", bg: "#FF9A00", color: "#000000", icon: "Ai", iconBg: "#7C2D12", iconColor: "#FFFFFF" },
      { name: "Webflow", bg: "#146EF5", color: "#FFFFFF", icon: "W", iconBg: "#1E40AF", iconColor: "#FFFFFF" },
      { name: "Miro", bg: "#FFD02F", color: "#000000", icon: "M", iconBg: "#713F12", iconColor: "#FFFFFF" },
    ],
  },
  {
    category: "UX RESEARCH & STRATEGY",
    icon: (
      <span className="retro-icon-frame emerald">
        <SearchRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
      </span>
    ),
    skills: [
      { name: "User Research", bg: "#10B981", color: "#FFFFFF", icon: <SearchRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#064E3B", iconColor: "#FFFFFF" },
      { name: "Personas", bg: "#3B82F6", color: "#FFFFFF", icon: <PersonRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#1E3A8A", iconColor: "#FFFFFF" },
      { name: "Journey Mapping", bg: "#8B5CF6", color: "#FFFFFF", icon: <MapRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#4C1D95", iconColor: "#FFFFFF" },
      { name: "Usability Testing", bg: "#EC4899", color: "#FFFFFF", icon: <ScienceRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#831843", iconColor: "#FFFFFF" },
      { name: "Heuristic Audit", bg: "#F59E0B", color: "#000000", icon: <AssignmentRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#78350F", iconColor: "#FFFFFF" },
      { name: "WCAG 2.1 AA", bg: "#06B6D4", color: "#000000", icon: <AccessibleRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#164E63", iconColor: "#FFFFFF" },
      { name: "Design Systems", bg: "#6366F1", color: "#FFFFFF", icon: <SquareFootRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#312E81", iconColor: "#FFFFFF" },
    ],
  },
  {
    category: "UI DEVELOPMENT",
    icon: (
      <span className="retro-icon-frame blue">
        <CodeRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
      </span>
    ),
    skills: [
      { name: "HTML5", bg: "#E34F26", color: "#FFFFFF", icon: "5", iconBg: "#7F1D1D", iconColor: "#FFFFFF" },
      { name: "CSS3", bg: "#1572B6", color: "#FFFFFF", icon: "3", iconBg: "#1E3A8A", iconColor: "#FFFFFF" },
      { name: "JavaScript", bg: "#F7DF1E", color: "#000000", icon: "JS", iconBg: "#713F12", iconColor: "#FFFFFF" },
      { name: "React", bg: "#61DAFB", color: "#000000", icon: "⚛", iconBg: "#0C4A6E", iconColor: "#FFFFFF" },
      { name: "Responsive UI", bg: "#10B981", color: "#FFFFFF", icon: <SmartphoneRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#064E3B", iconColor: "#FFFFFF" },
      { name: "Bootstrap", bg: "#7952B3", color: "#FFFFFF", icon: "B", iconBg: "#3B0764", iconColor: "#FFFFFF" },
      { name: "Tailwind CSS", bg: "#38BDF8", color: "#000000", icon: "≈", iconBg: "#0C4A6E", iconColor: "#FFFFFF" },
    ],
  },
  {
    category: "AI & MODERN WORKFLOWS",
    icon: (
      <span className="retro-icon-frame purple">
        <AutoAwesomeRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
      </span>
    ),
    skills: [
      { name: "Claude", bg: "#D97706", color: "#FFFFFF", icon: <SmartToyRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#78350F", iconColor: "#FFFFFF" },
      { name: "ChatGPT", bg: "#10A37F", color: "#FFFFFF", icon: <ChatRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#064E3B", iconColor: "#FFFFFF" },
      { name: "GitHub Copilot", bg: "#24292E", color: "#FFFFFF", icon: <CodeRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#4B5563", iconColor: "#FFFFFF" },
      { name: "Midjourney", bg: "#8B5CF6", color: "#FFFFFF", icon: <BrushRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#4C1D95", iconColor: "#FFFFFF" },
      { name: "Adobe Firefly", bg: "#FF2600", color: "#FFFFFF", icon: <LocalFireDepartmentRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#7F1D1D", iconColor: "#FFFFFF" },
      { name: "AI-Assisted UI", bg: "#0284C7", color: "#FFFFFF", icon: <BoltRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />, iconBg: "#0C4A6E", iconColor: "#FFFFFF" },
    ],
  },
];

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
    theme: "purple",
    icon: <SchoolRoundedIcon style={{ color: "#FFFFFF", fontSize: 20 }} />,
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
    theme: "emerald",
    icon: <WorkspacePremiumRoundedIcon style={{ color: "#FFFFFF", fontSize: 20 }} />,
  },
];

const Education = () => {
  return (
    <div id="education">
      <FadeInSection>
        {/* Section 04 Header: Number Left, Title Right */}
        <div className="section-header">
          <span className="section-number">04</span>
          <span className="section-title">SKILLS & TECH-STACK</span>
        </div>

        {/* 2x2 Grid of White Category Cards with Colorful Badges */}
        <div className="omori-skills-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="omori-skill-card">
              <div className="omori-skill-cat-header">
                <span className="omori-cat-icon">{cat.icon}</span>
                <span className="omori-cat-title">{cat.category}</span>
              </div>

              <div className="omori-badges-flex">
                {cat.skills.map((s, sIdx) => (
                  <div
                    key={sIdx}
                    className="omori-skill-badge"
                    style={{ backgroundColor: s.bg, color: s.color }}
                  >
                    <span
                      className="badge-icon"
                      style={{ backgroundColor: s.iconBg, color: s.iconColor || "#FFFFFF" }}
                    >
                      {s.icon}
                    </span>
                    <span className="badge-text">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section 05 Header: Title Left, Number Right */}
        <div className="section-header" style={{ marginTop: "80px" }}>
          <span className="section-title">EDUCATION & CREDENTIALS</span>
          <span className="section-number">05</span>
        </div>

        <div className="education-grid">
          {educationData.map((item, index) => (
            <FadeInSection key={index} delay={`${(index + 1) * 150}ms`}>
              <div className="education-card">
                <div className="card-header-row">
                  <div className={`edu-icon ${item.theme}`}>{item.icon}</div>
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
