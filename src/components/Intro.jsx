import React from "react";
import "../styles/Intro.css";
import { TypeAnimation } from "react-type-animation";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import AccessibleRoundedIcon from "@mui/icons-material/AccessibleRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FadeInSection from "./FadeInSection";
import HeroVisual from "./HeroVisual";
const BehanceIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.836 3-3.054 0-4.89-2.007-4.89-4.823 0-3.068 1.942-5.177 4.808-5.177 2.986 0 4.542 2.052 4.417 4.908h-6.757c.075 1.156.848 1.982 2.373 1.982 1.218 0 1.996-.447 2.275-1.127l2.61.237zm-2.483-4.004c-.062-.971-.723-1.68-1.849-1.68-1.077 0-1.782.684-1.943 1.68h3.792zm-12.243-5.996h-9v14h8.568c2.894 0 5.432-1.348 5.432-4.489 0-1.987-1.175-3.328-2.618-3.901 1.258-.619 2.086-1.748 2.086-3.414 0-2.67-2.188-2.196-4.468-2.196zm-5.5.945h2.88c1.229 0 2.233.32 2.233 1.488 0 1.173-1.004 1.567-2.233 1.567h-2.88v-3.055zm0 5.055h3.084c1.378 0 2.416.398 2.416 1.704 0 1.348-1.038 1.741-2.416 1.741h-3.084v-3.445z"/>
  </svg>
);

const DribbbleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10.038 11.026c-.328-.052-2.912-.429-5.834.254.912 2.493 1.385 5.064 1.464 5.518 2.632-1.467 4.237-3.985 4.37-5.772zm-2.404 6.837c-.104-.543-.585-3.159-1.547-5.703-3.666 1.177-7.07 1.127-7.234 1.124-.035.158-.073.316-.111.474-.298 1.218-.748 3.036-.748 5.242 3.655 1.597 7.784.053 9.64-1.137zm-10.741 1.782c.112-2.023.541-3.693.811-4.793-2.612.632-5.188.58-6.141.536.814 2.298 2.825 4.025 5.33 4.257zm-6.852-5.617c.905.04 3.121.057 5.485-.494-1.023-2.634-2.146-4.992-2.316-5.358-2.638 1.442-3.654 4.032-3.169 5.852zm4.184-7.143c.209.444 1.332 2.802 2.373 5.451 2.766-.641 5.253-.29 5.568-.242-1.018-2.222-2.859-4.707-6.071-5.467-.667.065-1.289.148-1.87.258zm8.68-1.015c3.003 1.057 4.707 3.376 5.463 5.378 2.502-.638 4.707-.291 4.976-.246-.667-2.222-2.859-4.707-6.071-5.467-.123.085-1.289.148-1.87.258z"/>
  </svg>
);

const MediumIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const Intro = () => {
  return (
    <div id="intro">
      <FadeInSection>
        <div className="hero-studio-hub">
          {/* Header System Banner */}
          <div className="hero-system-banner">
            <span className="banner-dot" />
            <span>SYSTEM READY • SRI SAKTHI KUMAR M • AVAILABLE FOR HIRE</span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="wave-container">
            <h1 className="hero-main-heading wave-text">
              <span>S</span>
              <span>R</span>
              <span>I</span>
              <span className="space">&nbsp;</span>
              <span>S</span>
              <span>A</span>
              <span>K</span>
              <span>T</span>
              <span>H</span>
              <span>I</span>
              <span className="space">&nbsp;</span>
              <span>K</span>
              <span>U</span>
              <span>M</span>
              <span>A</span>
              <span>R</span>
              <span className="space">&nbsp;</span>
              <span>M</span>
            </h1>
          </div>

          <div className="hero-animated-sub">
            <TypeAnimation
              sequence={[
                "UI/UX Designer",
                1800,
                "Product Designer",
                1800,
                "UI Developer",
                1800,
                "Design Systems Lead",
                1800,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p className="hero-bio-paragraph">
            Crafting scalable design systems, high-fidelity Figma prototypes, and responsive web applications. Specialized in complex SaaS workflows, B2B logistics, and accessible user experiences.
          </p>

          {/* Action Buttons Row - Top 3 Primary Contacts */}
          <div className="hero-actions-row">
            <a
              href="mailto:srisakthikumar03@gmail.com"
              className="omori-btn-black"
            >
              <span className="retro-icon-frame gmail">
                <EmailRoundedIcon style={{ fontSize: 14, color: "#FFFFFF" }} />
              </span>
              <span>SAY HI! / CONTACT</span>
            </a>

            <a
              href="https://www.behance.net/21cs157srisak"
              target="_blank"
              rel="noopener noreferrer"
              className="omori-btn-white"
            >
              <span className="retro-icon-frame blue">
                <BehanceIcon />
              </span>
              <span>BEHANCE PORTFOLIO</span>
            </a>

            <a
              href="https://www.linkedin.com/in/srisakthikumar"
              target="_blank"
              rel="noopener noreferrer"
              className="omori-btn-white"
            >
              <span className="retro-icon-frame linkedin">
                <LinkedInIcon style={{ fontSize: 14, color: "#FFFFFF" }} />
              </span>
              <span>LINKEDIN PROFILE</span>
            </a>

            <a
              href="/Sri_Sakthi_Kumar_Resume.pdf"
              download="Sri_Sakthi_Kumar_M_Resume.pdf"
              onClick={() => window.open("/Sri_Sakthi_Kumar_Resume.pdf?view=1", "_blank")}
              className="omori-btn-white"
            >
              <span className="retro-icon-frame red">
                <DownloadRoundedIcon style={{ fontSize: 14, color: "#FFFFFF" }} />
              </span>
              <span>MY RESUME</span>
            </a>
          </div>

          {/* Hero Centerpiece: Design Studio OS Window */}
          <HeroVisual />

          {/* 5 Interactive Metric & Skill Badges */}
          <div className="hero-badges-row">
            <div className="hero-badge-pill">
              <span className="retro-icon-frame coral">
                <PaletteRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
              </span>
              <span>20+ FIGMA SCREENS</span>
            </div>
            <div className="hero-badge-pill">
              <span className="retro-icon-frame emerald">
                <TrendingUpRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
              </span>
              <span>+35% ENGAGEMENT LIFT</span>
            </div>
            <div className="hero-badge-pill">
              <span className="retro-icon-frame cyan">
                <AccessibleRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
              </span>
              <span>100% WCAG 2.1 AA</span>
            </div>
            <div className="hero-badge-pill">
              <span className="retro-icon-frame purple">
                <BoltRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
              </span>
              <span>B2B LOGISTICS SAAS</span>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default Intro;
