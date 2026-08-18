/* eslint-disable no-unused-vars */
import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import KeyboardRoundedIcon from "@mui/icons-material/KeyboardRounded";
import MouseRoundedIcon from "@mui/icons-material/MouseRounded";
import HeadphonesRoundedIcon from "@mui/icons-material/HeadphonesRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import HomeRepairServiceRoundedIcon from "@mui/icons-material/HomeRepairServiceRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

const strengthsData = [
  { name: "User Research & Strategy", percent: 95, color: "#EC4899" }, // rose
  { name: "High-Figma Prototyping", percent: 92, color: "#06B6D4" }, // cyan
  { name: "WCAG 2.1 AA Accessibility", percent: 88, color: "#10B981" }, // emerald
  { name: "Component Systems & Code", percent: 90, color: "#F59E0B" }, // amber
  { name: "Problem Solving & Collab", percent: 95, color: "#8B5CF6" }, // purple
];

export const RetroPixelBoltIcon = ({ style }) => (
  <svg
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    fill="currentColor"
    style={{ shapeRendering: "crispEdges", display: "inline-block", verticalAlign: "middle", ...style }}
  >
    <path d="M7 1h5v4h-3v2h4v2H9v2H7v4H4v-5h3V8H4V6h3V1z" />
  </svg>
);

const GRID_ROWS = 10;
const GRID_COLS = 8;

const PixelDissolveAvatar = ({ pixelSrc, realSrc, alt }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const tiles = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      const delay = (r + c) * 35;
      const reverseDelay = (GRID_ROWS + GRID_COLS - (r + c)) * 25;
      tiles.push({ r, c, delay, reverseDelay });
    }
  }

  return (
    <div
      className={`pixel-dissolve-container ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      {/* Real Photo (Bottom Layer - Always Visible Underneath) */}
      <img src={realSrc} alt={alt} className="pixel-dissolve-real-bg" />

      {/* 2-Way Staggered Pixel Tile Dissolve & Reassembly Grid */}
      <div className="pixel-grid-wrapper">
        {tiles.map((t, idx) => {
          const leftPct = (t.c / GRID_COLS) * 100;
          const topPct = (t.r / GRID_ROWS) * 100;
          const widthPct = (1 / GRID_COLS) * 100;
          const heightPct = (1 / GRID_ROWS) * 100;
          const bgPosX = t.c > 0 ? (t.c / (GRID_COLS - 1)) * 100 : 0;
          const bgPosY = t.r > 0 ? (t.r / (GRID_ROWS - 1)) * 100 : 0;

          return (
            <div
              key={idx}
              className="pixel-tile"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                width: `${widthPct}%`,
                height: `${heightPct}%`,
                transitionDelay: isHovered ? `${t.delay}ms` : `${t.reverseDelay}ms`,
                overflow: "hidden",
              }}
            >
              <img 
                src={pixelSrc}
                alt=""
                style={{
                  position: "absolute",
                  width: `${GRID_COLS * 100}%`,
                  height: `${GRID_ROWS * 100}%`,
                  maxWidth: "none",
                  maxHeight: "none",
                  left: `-${t.c * 100}%`,
                  top: `-${t.r * 100}%`,
                  objectFit: "cover",
                  objectPosition: "center center",
                  pointerEvents: "none",
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="hover-instruction-hint">
        <span>TAP/HOVER FOR REALITY</span>
      </div>

      <div className="avatar-cat-badge">
        {isHovered ? (
          <span className="badge-text-real">
            <span className="retro-icon-frame amber">
              <RetroPixelBoltIcon style={{ fontSize: 14, color: "#FFFFFF" }} />
            </span>
            REALITY MODE
          </span>
        ) : (
          <span className="badge-text-pixel">SRI SAKTHI KUMAR M</span>
        )}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div id="about">
      {/* Pixelated Section Header (Title Left, Number Right) */}
      <FadeInSection delay="0s">
        <div className="section-header">
          <span className="section-title">PROFILE OVERVIEW</span>
          <span className="section-number">01</span>
        </div>
      </FadeInSection>

        <div className="bento-profile-container">
          {/* Top Bento Row: Avatar Card (Left) + Spacious Bio Card (Right) */}
          <div className="bento-top-row">
            {/* Bento Box 1: Left Avatar Portrait Card */}
            <FadeInSection delay="0.15s">
              <div className="bento-card bento-avatar-card">
                <div className="avatar-img-frame">
                  <PixelDissolveAvatar
                    pixelSrc="/assets/sri_pixel_profile.jpg"
                    realSrc="/assets/sri_real_profile.jpg"
                    alt="Sri Sakthi Kumar M"
                  />
                </div>
              </div>
            </FadeInSection>

            {/* Bento Box 2: Right Spacious Bio Card */}
            <FadeInSection delay="0.3s">
              <div className="bento-card bento-bio-card">
                <div className="bento-card-header">
                  <div className="card-top-title">
                    <span className="retro-icon-frame purple">
                      <DescriptionRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                    </span>
                    <span>ABOUT ME</span>
                  </div>
                  <span className="bento-role-badge">UI/UX DESIGNER • PRODUCT DEVELOPER</span>
                </div>

                <p className="bio-text-paragraph">
                  Hi, I&apos;m <strong>Sri Sakthi Kumar M</strong> — a <strong>UI/UX Designer, Product Designer, and UI Developer</strong> passionate about crafting smooth, interactive, and visually engaging web & mobile experiences. I enjoy blending user research and high-fidelity Figma prototyping to create scalable design systems and accessible interfaces.
                </p>

                {/* Highlight Chips Row */}
                <div className="bento-chips-row">
                  <span className="bento-chip">
                    <span className="retro-icon-frame rose mini">
                      <FavoriteRoundedIcon style={{ fontSize: 9, color: "#FFFFFF" }} />
                    </span>
                    20+ FIGMA SCREENS
                  </span>
                  <span className="bento-chip">
                    <span className="retro-icon-frame emerald mini">
                      <AutoAwesomeRoundedIcon style={{ fontSize: 9, color: "#FFFFFF" }} />
                    </span>
                    +35% ENGAGEMENT LIFT
                  </span>
                  <span className="bento-chip">
                    <span className="retro-icon-frame blue mini">
                      <CodeRoundedIcon style={{ fontSize: 9, color: "#FFFFFF" }} />
                    </span>
                    100% WCAG 2.1 AA
                  </span>
                  <span className="bento-chip">
                    <span className="retro-icon-frame amber mini">
                      <BoltRoundedIcon style={{ fontSize: 9, color: "#FFFFFF" }} />
                    </span>
                    B2B LOGISTICS SAAS
                  </span>
                </div>

                <div className="card-bottom-icon-bar">
                  <div className="retro-icon-tooltip-wrap">
                    <span className="retro-icon-frame rose">
                      <FavoriteRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                    </span>
                    <div className="retro-hover-popover rose-popover">
                      <span className="popover-text-with-icon">
                        <span className="desktop-only-text">HOBBIES: PIXEL ART, GAMING & UI CRAFTING</span>
                        <span className="mobile-only-text">PIXEL ART & GAMING</span>
                        <span className="retro-icon-frame purple mini inline-last">
                          <SportsEsportsRoundedIcon style={{ fontSize: 9, color: "#FFFFFF" }} />
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="retro-icon-tooltip-wrap">
                    <span className="retro-icon-frame amber">
                      <LocalCafeRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                    </span>
                    <div className="retro-hover-popover amber-popover">
                      <span className="popover-text-with-icon">
                        <span className="desktop-only-text">FUEL: COFFEE, MUSIC & CREATIVE IDEAS</span>
                        <span className="mobile-only-text">FUEL: COFFEE & MUSIC</span>
                        <span className="retro-icon-frame rose mini inline-last">
                          <HeadphonesRoundedIcon style={{ fontSize: 9, color: "#FFFFFF" }} />
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="retro-icon-tooltip-wrap">
                    <span className="retro-icon-frame blue">
                      <CodeRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                    </span>
                    <div className="retro-hover-popover blue-popover">
                      <span className="popover-text-with-icon">
                        <span className="desktop-only-text">CORE FOCUS: PIXEL-PERFECT DESIGN & CLEAN CODE</span>
                        <span className="mobile-only-text">FOCUS: PIXEL-PERFECT & CODE</span>
                        <span className="retro-icon-frame coral mini inline-last">
                          <AutoAwesomeRoundedIcon style={{ fontSize: 9, color: "#FFFFFF" }} />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Bottom Bento Row: 3 Equal-Width Columns */}
          <div className="bento-bottom-row">
            {/* Bento Box 3: Profile Details Card */}
            <FadeInSection delay="0.45s">
              <div className="bento-card bento-details-card">
                <div className="card-top-title">
                  <span className="retro-icon-frame purple">
                    <BoltRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                  </span>
                  <span>PROFILE DETAILS</span>
                </div>

                <div className="profile-detail-item">
                  <span className="detail-label">NAME</span>
                  <span className="detail-value bold">Sri Sakthi Kumar M</span>
                </div>

                <div className="profile-detail-item">
                  <span className="detail-label">ROLE</span>
                  <span className="detail-value">UI/UX Designer & Product Developer ❖</span>
                </div>

                <div className="profile-detail-item">
                  <span className="detail-label">EDUCATION</span>
                  <span className="detail-value">B.Sc. Computer Science & UI/UX Certified</span>
                </div>

                <div className="profile-detail-divider" />

                <div className="profile-detail-item location">
                  <span className="detail-label">
                    <span className="retro-icon-frame coral" style={{ width: 18, height: 18, fontSize: 8 }}>
                      <LocationOnRoundedIcon style={{ fontSize: 10, color: "#FFFFFF" }} />
                    </span>
                    LOCATION
                  </span>
                  <span className="detail-value bold">Bengaluru, Karnataka (Relocating)</span>
                  <span className="detail-subtext">Available for Remote & Onsite Roles</span>
                </div>
              </div>
            </FadeInSection>

            {/* Bento Box 4: Core Strengths Card */}
            <FadeInSection delay="0.525s">
              <div className="bento-card bento-strengths-card">
                <div className="card-top-title">
                  <span className="retro-icon-frame emerald">
                    <FitnessCenterRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                  </span>
                  <span>CORE STRENGTHS</span>
                </div>

                <div className="strengths-list">
                  {strengthsData.map((item, idx) => (
                    <div key={idx} className="strength-item">
                      <div className="strength-header">
                        <span className="strength-name">{item.name}</span>
                        <span className="strength-percent">{item.percent}%</span>
                      </div>
                      <div className="strength-track">
                        <div
                          className="strength-fill"
                          style={{ 
                            '--target-percent': `${item.percent}%`,
                            backgroundColor: item.color 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>

            {/* Bento Box 5: Tech Setup Card */}
            <FadeInSection delay="0.6s">
              <div className="bento-card bento-setup-card">
                <div className="card-top-title">
                  <span className="retro-icon-frame coral">
                    <HomeRepairServiceRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                  </span>
                  <span>TECH SETUP</span>
                </div>

                <div className="setup-list">
                  <div className="setup-item">
                    <span className="retro-icon-frame blue">
                      <LaptopMacRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                    </span>
                    <div>
                      <div className="setup-title">ASUS Workstation</div>
                      <div className="setup-sub">Intel i7, 16GB, GPU</div>
                    </div>
                  </div>

                  <div className="setup-item">
                    <span className="retro-icon-frame purple">
                      <KeyboardRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                    </span>
                    <div>
                      <div className="setup-title">Figma & Mech Deck</div>
                      <div className="setup-sub">Fast hotkey workflow</div>
                    </div>
                  </div>

                  <div className="setup-item">
                    <span className="retro-icon-frame emerald">
                      <MouseRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                    </span>
                    <div>
                      <div className="setup-title">Precision Mouse</div>
                      <div className="setup-sub">Pixel-perfect vectors</div>
                    </div>
                  </div>

                  <div className="setup-item">
                    <span className="retro-icon-frame amber">
                      <HeadphonesRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                    </span>
                    <div>
                      <div className="setup-title">High-DPI Display</div>
                      <div className="setup-sub">Color-calibrated UI</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
    </div>
  );
};

export default About;
