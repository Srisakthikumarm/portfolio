import React, { useState, useEffect } from "react";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import VideogameAssetRoundedIcon from "@mui/icons-material/VideogameAssetRounded";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import "../styles/LoadingScreen.css";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const bootInstructions = [
    { pct: 0, text: "SYSTEM BOOT SEQUENCE: SRI_SAKTHI_OS.EXE", colorClass: "blue", icon: <ComputerRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} /> },
    { pct: 20, text: "RETRO BGM AUDIO: Press [M] or Top Bar to MUTE", colorClass: "green", icon: <MusicNoteRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} /> },
    { pct: 45, text: "CYBER ARCADE: Arrow Keys Move • SPACE Fire", colorClass: "coral", icon: <VideogameAssetRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} /> },
    { pct: 70, text: "DESIGN TOKENS: Calibrating WCAG 2.1 AA...", colorClass: "purple", icon: <ColorLensRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} /> },
    { pct: 95, text: "SYSTEM READY 100% — LAUNCHING PORTFOLIO...", colorClass: "green", icon: <CheckCircleRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} /> },
  ];

  // Calculate current active single instruction index based on progress
  const activeInstructionIndex = bootInstructions.reduce((accIndex, item, idx) => {
    return progress >= item.pct ? idx : accIndex;
  }, 0);

  const currentInstruction = bootInstructions[activeInstructionIndex];

  useEffect(() => {
    // Smooth timer (~5.2s duration) so user reads each rotating instruction comfortably
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const increment = Math.floor(Math.random() * 3) + 2;
        const next = prev + increment;
        return Math.min(100, next);
      });
    }, 85);

    return () => clearInterval(timer);
  }, []);

  // Directly launch portfolio at 100% after brief finish delay
  useEffect(() => {
    if (progress >= 100) {
      const finishTimer = setTimeout(() => {
        setIsFading(true);
        const completeTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 600);
        return () => clearTimeout(completeTimer);
      }, 700);
      return () => clearTimeout(finishTimer);
    }
  }, [progress, onComplete]);

  return (
    <div className={`loading-screen-overlay ${isFading ? "fade-out" : ""}`}>
      <div className="loading-content-box">
        {/* Top Header Logo Row */}
        <div className="loading-logo-row">
          <img src="/favicon.svg" alt="Logo" className="loading-logo-icon" />
          <span className="loading-brand-text">SRI SAKTHI KUMAR M</span>
        </div>
        <div className="loading-subtitle">
          UI/UX DESIGNER • PRODUCT SPECIALIST
        </div>

        {/* Big Percentage Number */}
        <div className="loading-percentage">
          {progress}<span className="percent-symbol">%</span>
        </div>

        {/* Clean Text-Only Instruction Line (Above Progress Bar, No Box Container) */}
        <div className="loading-text-instruction">
          <div
            key={activeInstructionIndex}
            className="cylinder-rotating-line"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#000000", fontWeight: "900", textTransform: "uppercase" }}
          >
            <span className={`retro-icon-frame ${currentInstruction.colorClass}`} style={{ width: 18, height: 18, flexShrink: 0 }}>
              {currentInstruction.icon}
            </span>
            <span style={{ whiteSpace: "nowrap" }}>{currentInstruction.text}</span>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="loading-bar-track">
          <div
            className="loading-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
