import React, { useState } from "react";
import FadeInSection from "./FadeInSection";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";

const experienceItems = [
  {
    id: "flow",
    label: (
      <>
        <span className="desktop-only-text">FLOW LOGISTICS SOLUTION LLP</span>
        <span className="mobile-only-text">FLOW LOGISTICS</span>
      </>
    ),
    company: "Flow Logistics Solution LLP",
    jobTitle: "UI/UX Designer & UI Developer (AI Workflows) @",
    location: "Bengaluru, India",
    duration: "AUGUST 2025 – PRESENT",
    icon: (
      <span className="retro-icon-frame blue">
        <WorkRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
      </span>
    ),
    skills: ["FIGMA", "HTML5/CSS3", "JAVASCRIPT", "B2B LOGISTICS", "WCAG 2.1 AA", "DESIGN SYSTEM"],
    desc: [
      "Redesigned 20+ screens of a legacy B2B logistics platform in Figma; built responsive HTML5/CSS3 frontend achieving 35% engagement lift and 25% task-completion improvement (measured via Google Analytics).",
      "Designed 10+ form screens with custom validation UI and error states, reducing form-completion time by 25%; identified 8 usability friction points via heuristic evaluation and shipped fixes across 2 Agile sprints.",
      "Built a standardised Figma component library and design system, cutting per-feature design and development effort by 40%.",
      "Implemented WCAG 2.1 AA accessibility guidelines and scalable interaction design patterns across all modules.",
    ],
  },
  {
    id: "freelance",
    label: "FREELANCE PROJECTS",
    company: "Freelance & Collaborative Projects",
    jobTitle: "UI/UX Designer @",
    location: "Self-Initiated Remote",
    duration: "NOVEMBER 2024 – JULY 2025",
    icon: (
      <span className="retro-icon-frame purple">
        <LaptopMacRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
      </span>
    ),
    skills: ["FIGMA", "FRAMER", "WEBFLOW", "UX RESEARCH", "USABILITY TESTING", "AI WORKFLOWS"],
    desc: [
      "Delivered 3+ responsive web interfaces across travel, edtech, and fintech using Figma, Framer, and Webflow; built scalable design systems reducing revision cycles by 40%.",
      "Applied AI-assisted workflows (Claude, ChatGPT, Codex) to accelerate prototyping, compressing delivery timelines by 25% across multiple projects.",
      "Conducted 3+ rounds of usability testing with 10+ participants, resolving critical onboarding and navigation friction points before production handoff.",
    ],
  },
];

const JobList = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentItem = experienceItems[activeIdx];

  return (
    <div className="exp-switcher-container">
      {/* Retro Company Tab Switcher Bar */}
      <div className="exp-tab-switcher-bar">
        {experienceItems.map((item, idx) => (
          <button
            key={item.id}
            className={activeIdx === idx ? "omori-btn-black" : "omori-btn-white"}
            onClick={() => setActiveIdx(idx)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Experience Content Panel */}
      <div className="exp-content-panel">
        <div className="joblist-header-block">
          <span className="joblist-job-title">{currentItem.jobTitle} </span>
          <span className="joblist-job-company">{currentItem.company}</span>
        </div>

        <div className="joblist-duration">
          <span className="omori-tech-pill">{currentItem.duration}</span>
        </div>

        <ul className="job-description">
          {currentItem.desc.map((descItem, idx) => (
            <FadeInSection key={idx} delay={`${(idx + 1) * 100}ms`}>
              <li>{descItem}</li>
            </FadeInSection>
          ))}
        </ul>

        <div className="job-skills-row">
          {currentItem.skills.map((s, sIdx) => (
            <span key={sIdx} className="omori-tech-pill">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
