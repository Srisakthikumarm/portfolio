import React, { useState } from "react";
import "../styles/HeroVisual.css";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const HeroVisual = () => {
  const [activeFrame, setActiveFrame] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50, active: false });

  const projectFrames = [
    {
      id: "flow",
      name: "Flow B2B Logistics Platform",
      tag: "Figma Design System",
      metric: "+35% Engagement Lift",
      secondaryMetric: "-25% Task Time",
      color: "#00E5FF",
      layers: ["Header Navigation", "Shipment Map UI", "Form Validation Matrix", "WCAG 2.1 AA Tokens"],
    },
    {
      id: "acadintern",
      name: "AcadIntern Discovery Platform",
      tag: "15+ Figma Screens & Research",
      metric: "Zero Critical UX Bugs",
      secondaryMetric: "10+ Student Usability Tests",
      color: "#A259FF",
      layers: ["Search Filters UI", "Internship Cards", "Student Profile Flow", "Onboarding Wizard"],
    },
    {
      id: "trekzy",
      name: "Trekzy Travel SaaS",
      tag: "Mobile-First SaaS Design",
      metric: "+20% Usability Score",
      secondaryMetric: "Full Journey Mapping",
      color: "#00E676",
      layers: ["Mobile Itinerary Builder", "Flight Booking UI", "Interactive Map", "Design Tokens"],
    },
  ];

  const currentFrame = projectFrames[activeFrame];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setCursorPos({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setCursorPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      className="hero-figma-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="figma-window-frame">
        {/* Window Topbar */}
        <div className="figma-topbar">
          <div className="window-controls">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="figma-file-info">
            <DesignServicesRoundedIcon className="figma-icon" />
            <span className="file-name">Sri_Sakthi_UI_UX_Portfolio.fig</span>
          </div>
          <div className="figma-live-pill">
            <span className="pulse-dot" />
            <span>Live Canvas</span>
          </div>
        </div>

        {/* Project Selector Tabs */}
        <div className="figma-project-tabs">
          {projectFrames.map((frame, idx) => (
            <button
              key={frame.id}
              className={`project-tab-btn ${activeFrame === idx ? "active" : ""}`}
              onClick={() => setActiveFrame(idx)}
              style={{
                borderColor: activeFrame === idx ? frame.color : "transparent",
              }}
            >
              <span className="tab-indicator" style={{ background: frame.color }} />
              {frame.name.split(" ")[0]} Project
            </button>
          ))}
        </div>

        {/* Main Canvas Grid Layout */}
        <div className="figma-canvas-grid">
          {/* Left Layers Panel */}
          <div className="figma-layers-panel">
            <div className="panel-heading">
              <span>Layers</span>
              <AutoAwesomeRoundedIcon style={{ fontSize: 13, color: "#00E5FF" }} />
            </div>
            <ul className="layers-list">
              {currentFrame.layers.map((layer, lIdx) => (
                <li key={lIdx} className="layer-item">
                  <span className="layer-icon">❖</span>
                  <span className="layer-text">{layer}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Stage Canvas Preview */}
          <div className="figma-stage-canvas">
            <div className="grid-overlay" />

            {/* Interactive Frame UI Card */}
            <div
              className="canvas-frame-card"
              style={{
                borderColor: currentFrame.color,
                boxShadow: `0 12px 35px -10px ${currentFrame.color}35`,
              }}
            >
              <div className="frame-card-badge" style={{ background: currentFrame.color }}>
                {currentFrame.tag}
              </div>
              <h4 className="frame-card-title">{currentFrame.name}</h4>

              <div className="frame-metrics-row">
                <div className="metric-badge" style={{ borderColor: currentFrame.color, color: currentFrame.color }}>
                  <CheckCircleRoundedIcon style={{ fontSize: 14 }} />
                  <span>{currentFrame.metric}</span>
                </div>
                <div className="metric-badge secondary">
                  <span>{currentFrame.secondaryMetric}</span>
                </div>
              </div>

              {/* Wireframe UI Prototype Skeleton */}
              <div className="wireframe-skeleton">
                <div className="skeleton-bar" />
                <div className="skeleton-row">
                  <div className="skeleton-chip" />
                  <div className="skeleton-chip" />
                  <div className="skeleton-chip active" style={{ background: `${currentFrame.color}25`, borderColor: currentFrame.color }} />
                </div>
              </div>
            </div>

            {/* Dynamic Figma Mouse Cursor Follower */}
            {cursorPos.active && (
              <div
                className="figma-live-cursor"
                style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill={currentFrame.color} stroke="#0B0F19" strokeWidth="2" />
                </svg>
                <span className="live-cursor-tag" style={{ background: currentFrame.color }}>
                  Sri Sakthi
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
