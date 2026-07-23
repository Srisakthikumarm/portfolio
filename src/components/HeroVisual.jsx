import React, { useState, useRef } from "react";
import "../styles/HeroVisual.css";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const HeroVisual = () => {
  const [activeFrame, setActiveFrame] = useState(0);
  const containerRef = useRef(null);

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
      secondaryMetric: "10+ Usability Tests",
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
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    containerRef.current.style.setProperty("--cursor-x", `${x}%`);
    containerRef.current.style.setProperty("--cursor-y", `${y}%`);
    containerRef.current.style.setProperty("--cursor-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--cursor-opacity", "0");
  };

  return (
    <div className="hero-figma-container">
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
              <span>LAYERS</span>
              <AutoAwesomeRoundedIcon style={{ fontSize: 12, color: currentFrame.color }} />
            </div>
            <div className="layers-list">
              {currentFrame.layers.map((layer, lIdx) => (
                <div key={lIdx} className="layer-item">
                  <span className="layer-diamond" style={{ color: currentFrame.color }}>❖</span>
                  <span>{layer}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center Interactive Canvas Stage (Matching Image 2) */}
          <div
            ref={containerRef}
            className="figma-stage-canvas"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="grid-overlay" />

            {/* Figma Preview Card Frame */}
            <div
              className="canvas-frame-card"
              style={{
                borderColor: currentFrame.color,
                boxShadow: `0 0 25px ${currentFrame.color}25, 0 12px 35px rgba(0,0,0,0.5)`,
              }}
            >
              <div className="frame-card-badge" style={{ background: currentFrame.color }}>
                {currentFrame.tag}
              </div>
              <h4 className="frame-card-title">{currentFrame.name}</h4>

              <div className="frame-metrics-row">
                <div className="metric-badge" style={{ borderColor: currentFrame.color, color: currentFrame.color, background: `${currentFrame.color}15` }}>
                  <CheckCircleRoundedIcon style={{ fontSize: 13 }} />
                  <span>{currentFrame.metric}</span>
                </div>
                <div className="metric-badge secondary">
                  <span>{currentFrame.secondaryMetric}</span>
                </div>
              </div>

              <div className="skeleton-bar" style={{ margin: "12px 0" }} />

              <div className="skeleton-row">
                <div className="skeleton-chip" />
                <div className="skeleton-chip" />
                <div className="skeleton-chip active" style={{ borderColor: currentFrame.color, background: `${currentFrame.color}20` }} />
              </div>
            </div>

            {/* Dynamic Figma Mouse Cursor Follower */}
            <div
              className="figma-live-cursor"
              style={{
                left: "var(--cursor-x, 50%)",
                top: "var(--cursor-y, 50%)",
                opacity: "var(--cursor-opacity, 0)",
                transition: "opacity 0.2s ease",
                pointerEvents: "none",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill={currentFrame.color} stroke="#0B0F19" strokeWidth="2" />
              </svg>
              <span className="live-cursor-tag" style={{ background: currentFrame.color }}>
                Sri Sakthi
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
