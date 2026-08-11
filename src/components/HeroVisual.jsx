import React, { useState, useRef } from "react";
import "../styles/HeroVisual.css";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const heroProjects = [
  {
    id: "aether",
    name: "Aether Analytics SaaS Platform & Ad Campaign",
    tag: "Dark Theme SaaS & AI Telemetry UX",
    metric: "+34% Active User Growth",
    secondaryMetric: "Behance & Medium Featured",
    badge: "AETHER ANALYTICS",
    image: "/assets/aether_analytics.jpg",
    layers: ["Dark UI Trust Architecture", "Active Telemetry Graphs", "Database AI Hooks", "Behance & Medium Study"],
    colors: [
      { hex: "#0B0F19", label: "OBSIDIAN DARK", textLight: true },
      { hex: "#00F5A0", label: "NEON MINT", textLight: false },
      { hex: "#6366F1", label: "CYBER INDIGO", textLight: true },
      { hex: "#F9FAFB", label: "PURE WHITE", textLight: false },
    ],
    contrast: "18.5:1 AAA Contrast Ratio (Dark Mode Pass)",
    fontHeader: "Inter & JetBrains Mono",
    fontBody: "Plus Jakarta Sans",
  },
  {
    id: "logistics-command",
    name: "Logistics Command - 3 AM Alert Triage",
    tag: "Enterprise Exception Management",
    metric: "-40% Exception Triage Time",
    secondaryMetric: "Medium Featured Study",
    badge: "LOGISTICS COMMAND",
    image: "/assets/logistics_command.jpg",
    layers: ["Route Deviation Triage", "3 AM Alert Matrix", "Vehicle Telemetry Drawer", "Behance & Medium Study"],
    colors: [
      { hex: "#111827", label: "CHARCOAL DARK", textLight: true },
      { hex: "#EF4444", label: "ALERT CRITICAL RED", textLight: true },
      { hex: "#F59E0B", label: "WARNING AMBER", textLight: false },
      { hex: "#38BDF8", label: "TELEMETRY CYAN", textLight: false },
    ],
    contrast: "16.8:1 AAA Contrast Ratio (High Stress Pass)",
    fontHeader: "Space Mono & Inter",
    fontBody: "System Sans",
  },
  {
    id: "acadintern",
    name: "AcadIntern Discovery Portal",
    tag: "15+ Figma Screens & Research",
    metric: "Zero Critical UX Bugs",
    secondaryMetric: "10+ Usability Tests",
    badge: "ACADINTERN",
    image: "/assets/acadintern.png",
    layers: ["Search Filters UI", "Internship Cards", "Student Profile Flow", "Onboarding Wizard"],
    colors: [
      { hex: "#2563EB", label: "ACADEMY BLUE", textLight: true },
      { hex: "#8B5CF6", label: "DISCOVERY PURPLE", textLight: true },
      { hex: "#FFFFFF", label: "CLEAN CANVAS", textLight: false },
      { hex: "#0F172A", label: "DEEP TITANIUM", textLight: true },
    ],
    contrast: "17.2:1 AAA Contrast Ratio (Usability Tested)",
    fontHeader: "Plus Jakarta Sans",
    fontBody: "Outfit & Inter",
  },
];

const HeroVisual = () => {
  const [studioMode, setStudioMode] = useState("canvas"); // "canvas" or "lab"
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const containerRef = useRef(null);

  const currentProject = heroProjects[activeProjectIdx];

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
    <div className="hero-studio-window">
      {/* Studio Window Top Header */}
      <div className="studio-topbar">
        <div className="window-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="studio-title-badge">
          <span className="retro-icon-frame coral" style={{ width: 18, height: 18, fontSize: 8, marginRight: 4 }}>
            <DesignServicesRoundedIcon style={{ fontSize: 11, color: "#FFFFFF" }} />
          </span>
          <span>SRI_SAKTHI_DESIGN_STUDIO.EXE</span>
        </div>
        <div className="studio-mode-switcher">
          <button
            className={studioMode === "canvas" ? "omori-btn-black" : "omori-btn-white"}
            onClick={() => setStudioMode("canvas")}
          >
            <span className="retro-icon-frame purple">
              <AutoAwesomeRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
            </span>
            <span>CASE STUDY CANVAS</span>
          </button>
          <button
            className={studioMode === "lab" ? "omori-btn-black" : "omori-btn-white"}
            onClick={() => setStudioMode("lab")}
          >
            <span className="retro-icon-frame emerald">
              <PaletteRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
            </span>
            <span>DESIGN SYSTEM LAB</span>
          </button>
        </div>
      </div>

      {/* Mode A: Case Study Canvas */}
      {studioMode === "canvas" && (
        <div className="studio-canvas-layout">
          {/* Project Selector Bar */}
          <div className="studio-project-bar">
            {heroProjects.map((p, idx) => (
              <button
                key={p.id}
                className={`project-tab-btn ${activeProjectIdx === idx ? "active" : ""}`}
                onClick={() => setActiveProjectIdx(idx)}
              >
                {p.badge}
              </button>
            ))}
          </div>

          {/* Canvas Main Area */}
          <div
            ref={containerRef}
            className="studio-stage-area"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="stage-card-frame">
              <h3 className="stage-title">{currentProject.name}</h3>

              {/* High-res Image Screen */}
              <div className="stage-screen-box">
                <img src={currentProject.image} alt={currentProject.name} />
              </div>

              {/* Project Info Footer */}
              <div className="stage-header-row" style={{ marginTop: '4px' }}>
                <span className="stage-tag">{currentProject.tag}</span>
                <span className="stage-metric">
                  <span className="retro-icon-frame emerald" style={{ width: 18, height: 18, fontSize: 8, marginRight: 6 }}>
                    <CheckCircleRoundedIcon style={{ fontSize: 11, color: "#FFFFFF" }} />
                  </span>
                  {currentProject.metric}
                </span>
              </div>
            </div>

            {/* Dynamic Figma Live Cursor Follower */}
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="#000000" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
              <span className="live-cursor-tag">
                Sri Sakthi (UI/UX Designer)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Mode B: Design System Lab */}
      {studioMode === "lab" && (
        <div className="studio-lab-layout">
          {/* Project Selector for Design System Lab */}
          <div className="studio-project-bar" style={{ marginBottom: 18, borderBottom: "2px solid #000000" }}>
            {heroProjects.map((p, idx) => (
              <button
                key={p.id}
                className={`project-tab-btn ${activeProjectIdx === idx ? "active" : ""}`}
                onClick={() => setActiveProjectIdx(idx)}
              >
                {p.badge}
              </button>
            ))}
          </div>

          <div className="lab-grid">
            {/* Swatches Column */}
            <div className="lab-card">
              <div className="lab-card-title">
                COLOR TOKENS & CONTRAST — {currentProject.badge}
              </div>
              <div className="swatch-grid">
                {currentProject.colors.map((c, cIdx) => (
                  <div
                    key={cIdx}
                    className="swatch-box"
                    style={{
                      background: c.hex,
                      color: c.textLight ? "#FFFFFF" : "#000000",
                      border: "1.5px solid #000000",
                    }}
                  >
                    <span>{c.hex}</span>
                    <small>{c.label}</small>
                  </div>
                ))}
              </div>
              <div className="contrast-badge">
                <span>WCAG 2.1 AA: {currentProject.contrast}</span>
              </div>
            </div>

            {/* Component State Matrix Column */}
            <div className="lab-card">
              <div className="lab-card-title">COMPONENT STATE MATRIX</div>
              <div className="states-column">
                <div className="state-item">
                  <span className="state-label">PRIMARY ACTION:</span>
                  <div
                    className="mock-btn default"
                    style={{
                      background: currentProject.colors[0].hex,
                      color: currentProject.colors[0].textLight ? "#FFFFFF" : "#000000",
                    }}
                  >
                    EXPLORE CASE STUDY
                  </div>
                </div>
                <div className="state-item">
                  <span className="state-label">ACCENT BADGE:</span>
                  <div
                    className="mock-btn hover"
                    style={{
                      background: currentProject.colors[1].hex,
                      color: currentProject.colors[1].textLight ? "#FFFFFF" : "#000000",
                    }}
                  >
                    {currentProject.metric} ➔
                  </div>
                </div>
                <div className="state-item">
                  <span className="state-label">SURFACE CARD:</span>
                  <div
                    className="mock-btn active"
                    style={{
                      background: currentProject.colors[2].hex,
                      color: currentProject.colors[2].textLight ? "#FFFFFF" : "#000000",
                    }}
                  >
                    {currentProject.badge} COMPONENT
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Matrix Column */}
            <div className="lab-card">
              <div className="lab-card-title">TYPOGRAPHY HIERARCHY</div>
              <div className="typo-list">
                <div className="typo-item">
                  <span className="typo-name">HEADER SYSTEM</span>
                  <span className="typo-sample pixel" style={{ fontSize: 13 }}>
                    {currentProject.fontHeader}
                  </span>
                </div>
                <div className="typo-item">
                  <span className="typo-name">BODY SYSTEM</span>
                  <span className="typo-sample mono" style={{ fontSize: 12 }}>
                    {currentProject.fontBody}
                  </span>
                </div>
                <div className="typo-item">
                  <span className="typo-name">DESIGN TAG</span>
                  <span className="typo-sample body" style={{ fontSize: 12 }}>
                    {currentProject.tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Layers Stack Column */}
            <div className="lab-card">
              <div className="lab-card-title">PROJECT LAYERS</div>
              <div className="stage-layers-row" style={{ marginTop: 8 }}>
                {currentProject.layers.map((l, lIdx) => (
                  <span key={lIdx} className="layer-chip">
                    ◆ {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroVisual;
