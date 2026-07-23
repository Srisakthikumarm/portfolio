import React from "react";
import "../styles/Intro.css";
import { TypeAnimation } from "react-type-animation";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FadeInSection from "./FadeInSection";
import HeroVisual from "./HeroVisual";

const Intro = () => {
  return (
    <div id="intro">
      <div className="intro-simulation-wrap">
        <div className="hero-visual-frame">
          <HeroVisual />
        </div>
      </div>
      <div className="intro-block">
        <div className="status-pill">
          <span className="status-dot" />
          <span>Available for Full-Time & Freelance Projects</span>
        </div>
        <h1 className="intro-title">
          {"Hi, I'm "}
          <span className="intro-name">
            <TypeAnimation
              sequence={["Sri Sakthi Kumar"]}
              wrapper="span"
              cursor={false}
              repeat={0}
            />
          </span>
          <span className="intro-cursor">_</span>
        </h1>
        <div className="intro-role">
          <AutoAwesomeIcon style={{ fontSize: 18, color: "#00E5FF" }} />
          <span>UI/UX Designer • Product Designer • UI Developer</span>
        </div>
        <FadeInSection>
          <p className="intro-desc">
            Product & UI/UX Designer with <strong>1+ year of experience</strong> delivering production-ready web & mobile interfaces across logistics, travel, edtech, and fintech. Specialized in user research, high-fidelity Figma prototyping, design systems, WCAG 2.1 AA accessibility, and responsive frontend code powered by AI workflows.
          </p>

          <div className="hero-stats-row">
            <div className="hero-stat-chip">✨ 1+ Yr Industry Exp</div>
            <div className="hero-stat-chip">🎨 20+ Figma Screens</div>
            <div className="hero-stat-chip">🚀 +35% Engagement Lift</div>
          </div>

          <div className="intro-actions">
            <a href="mailto:srisakthikumar03@gmail.com" className="intro-contact">
              <EmailRoundedIcon style={{ fontSize: 19 }} />
              <span>Say Hi!</span>
            </a>
            <a
              href="https://srisakthikumar.framer.website"
              target="_blank"
              rel="noopener noreferrer"
              className="intro-secondary-btn"
            >
              <OpenInNewRoundedIcon style={{ fontSize: 18 }} />
              <span>Framer Portfolio</span>
            </a>
            <a
              href="https://www.linkedin.com/in/srisakthikumar"
              target="_blank"
              rel="noopener noreferrer"
              className="intro-secondary-btn"
            >
              <LinkedInIcon style={{ fontSize: 19 }} />
              <span>LinkedIn</span>
            </a>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Intro;
