import React, { useState, useEffect } from "react";
import "../styles/LoadingScreen.css";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Boot & Game instructions that rotate 1-by-1 like a 3D cylinder
  const bootInstructions = [
    { pct: 0, text: "> SYSTEM BOOT SEQUENCE: SRI_SAKTHI_OS.EXE v2.0.26", color: "#60A5FA" },
    { pct: 20, text: "♪ RETRO BGM AUDIO: Playing (Press [M] or Top Bar to MUTE)", color: "#10B981" },
    { pct: 45, text: "🎮 CYBER ARCADE: Active (WASD / Arrow Keys Move • SPACE Fire)", color: "#F59E0B" },
    { pct: 70, text: "⚡ DESIGN TOKENS: Calibrating WCAG 2.1 AA & UI Systems...", color: "#A855F7" },
    { pct: 95, text: "> SYSTEM READY 100% — LAUNCHING PORTFOLIO...", color: "#22C55E" },
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
            style={{ color: currentInstruction.color === "#10B981" ? "#059669" : currentInstruction.color === "#3B82F6" ? "#2563EB" : currentInstruction.color === "#F59E0B" ? "#D97706" : "#000000" }}
          >
            {currentInstruction.text}
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
