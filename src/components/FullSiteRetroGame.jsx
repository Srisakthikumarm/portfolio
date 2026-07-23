import React, { useRef, useEffect, useState, useCallback } from "react";
import "../styles/FullSiteRetroGame.css";

const SHIP_W = 42;
const SHIP_H = 28;

const getShipY = (canvasHeight) => {
  const isMobile = window.innerWidth <= 900;
  return isMobile ? canvasHeight - SHIP_H - 95 : canvasHeight - SHIP_H - 18;
};

const SECTOR_STAGES = [
  { id: 1, name: "HERO SECTOR", selector: "#intro", virusCount: 4, label: "STAGE 1 / 5" },
  { id: 2, name: "SKILLS MATRIX", selector: "#about", virusCount: 5, label: "STAGE 2 / 5" },
  { id: 3, name: "EXPERIENCE CORE", selector: "#experience", virusCount: 6, label: "STAGE 3 / 5" },
  { id: 4, name: "PROJECTS VAULT", selector: "#projects", virusCount: 6, label: "STAGE 4 / 5" },
  { id: 5, name: "EDUCATION HUB", selector: "#education", virusCount: 7, label: "STAGE 5 / 5" },
];

const VIRUS_TYPES = [
  { type: "404_VIRUS", color: "#FF5252", hp: 1, speed: 1.1, shooter: false },
  { type: "TROJAN.UX", color: "#FF9100", hp: 1, speed: 0.9, shooter: true, shootInterval: 140 },
  { type: "LOGIC_BOMB", color: "#E040FB", hp: 2, speed: 0.7, shooter: true, shootInterval: 110 },
  { type: "MALWARE.EXE", color: "#00E5FF", hp: 2, speed: 1.0, shooter: true, shootInterval: 90 },
];

const BOOSTER_TYPES = [
  { type: "SHIELD", icon: "🛡️", name: "FIREWALL SHIELD", color: "#00E676" },
  { type: "TRIPLE", icon: "⚡", name: "TRIPLE LASER", color: "#00E5FF" },
  { type: "EMP", icon: "💣", name: "EMP NUKE", color: "#FFD600" },
  { type: "FREEZE", icon: "⏳", name: "TIME FREEZE", color: "#E040FB" },
];

export default function FullSiteRetroGame({ active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [stageIndex, setStageIndex] = useState(0);
  const [stageTimer, setStageTimer] = useState(25);
  const [integrity, setIntegrity] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [stageBanner, setStageBanner] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const gameStateRef = useRef({
    x: 200,
    lasers: [],
    enemyLasers: [],
    enemies: [],
    boosters: [],
    particles: [],
    keys: { left: false, right: false, fire: false },
    touchDir: 0,
    fireTimer: 0,
    score: 0,
    lives: 3,
    integrity: 100,
    stageIndex: 0,
    stageTimer: 25,
    freezeTimer: 0,
    tripleTimer: 0,
    stageTimerAcc: 0,
    autoBoosterTimer: 0,
    stageTransitioning: false,
  });

  const lastCorruptionRef = useRef("");
  const isAutoScrollingRef = useRef(false);
  const sectionTopsRef = useRef([]);

  // Get absolute top offset from document <html>
  const getAbsoluteElementTop = (el) => {
    let top = 0;
    let curr = el;
    while (curr) {
      top += curr.offsetTop || 0;
      curr = curr.offsetParent;
    }
    return top;
  };

  // Display floating toast message
  const triggerToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 1600);
  }, []);

  // Cache top offsets of sections to avoid layout thrashing in 60fps loop
  const updateSectionTops = useCallback(() => {
    sectionTopsRef.current = SECTOR_STAGES.map((stage) => {
      const el = document.querySelector(stage.selector);
      return el ? getAbsoluteElementTop(el) : 0;
    });
  }, []);

  // Update website content corruption CSS class on #content efficiently
  const updateContentCorruption = useCallback((currentIntegrity) => {
    const contentEl = document.getElementById("content");
    if (!contentEl) return;

    let targetClass = "";
    if (currentIntegrity <= 0) {
      targetClass = "website-corrupted-critical";
    } else if (currentIntegrity <= 35) {
      targetClass = "website-corrupted-high";
    } else if (currentIntegrity <= 65) {
      targetClass = "website-corrupted-medium";
    } else if (currentIntegrity <= 85) {
      targetClass = "website-corrupted-low";
    }

    if (lastCorruptionRef.current === targetClass) return;
    lastCorruptionRef.current = targetClass;

    contentEl.classList.remove(
      "website-corrupted-low",
      "website-corrupted-medium",
      "website-corrupted-high",
      "website-corrupted-critical"
    );

    if (targetClass) {
      contentEl.classList.add(targetClass);
    }
  }, []);

  // Smooth scroll page to active sector section
  const scrollToStageSection = useCallback((stageIdx) => {
    const stage = SECTOR_STAGES[stageIdx];
    if (!stage) return;
    const targetEl = document.querySelector(stage.selector);
    if (targetEl) {
      isAutoScrollingRef.current = true;
      const topOffset = getAbsoluteElementTop(targetEl) - 90;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
      setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, 1000);
    }
  }, []);

  // Spawn viruses for a specific stage index
  const spawnStageViruses = useCallback((stageIdx) => {
    const w = window.innerWidth;
    const stageInfo = SECTOR_STAGES[stageIdx];
    const targetEl = document.querySelector(stageInfo.selector);
    const baseScrollY = targetEl
      ? getAbsoluteElementTop(targetEl)
      : stageIdx * 700 + 200;

    const newEnemies = [];
    for (let i = 0; i < stageInfo.virusCount; i++) {
      const virusDef = VIRUS_TYPES[i % VIRUS_TYPES.length];
      const rx = 50 + Math.random() * (w - 140);
      const rYOffset = 40 + Math.random() * 220;

      newEnemies.push({
        id: i + 1,
        x: rx,
        docY: baseScrollY + rYOffset,
        vx: (Math.random() > 0.5 ? 1 : -1) * (0.8 + Math.random() * 0.8),
        w: 46,
        h: 24,
        shootCooldown: Math.floor(Math.random() * 60),
        ...virusDef,
      });
    }

    return newEnemies;
  }, []);

  // Initialize or transition to a stage
  const loadStage = useCallback(
    (stageIdx) => {
      const gs = gameStateRef.current;
      gs.stageIndex = stageIdx;
      gs.stageTimer = 25;
      gs.stageTimerAcc = 0;
      gs.enemies = spawnStageViruses(stageIdx);
      gs.lasers = [];
      gs.enemyLasers = [];
      gs.boosters = [];
      gs.stageTransitioning = true; // Pause action while banner popup is showing

      setStageIndex(stageIdx);
      setStageTimer(25);

      const stageInfo = SECTOR_STAGES[stageIdx];
      setStageBanner({
        title: `⚡ ${stageInfo.name} SECURED!`,
        sub: `SECTOR ${stageIdx + 1} OF ${SECTOR_STAGES.length} INITIALIZED`,
      });
      setTimeout(() => {
        setStageBanner(null);
        gameStateRef.current.stageTransitioning = false; // Resume action after popup fades
      }, 1800);

      updateSectionTops();
      scrollToStageSection(stageIdx);
    },
    [spawnStageViruses, scrollToStageSection, updateSectionTops]
  );

  // Full game initialization
  const initGame = useCallback(() => {
    const w = window.innerWidth;
    gameStateRef.current = {
      x: w / 2 - SHIP_W / 2,
      lasers: [],
      enemyLasers: [],
      enemies: spawnStageViruses(0),
      boosters: [],
      particles: [],
      keys: { left: false, right: false, fire: false },
      touchDir: 0,
      fireTimer: 0,
      score: 0,
      lives: 3,
      integrity: 100,
      stageIndex: 0,
      stageTimer: 25,
      freezeTimer: 0,
      tripleTimer: 0,
      stageTimerAcc: 0,
      autoBoosterTimer: 0,
      stageTransitioning: true, // Pause action while intro popup is showing
    };

    setScore(0);
    setLives(3);
    setIntegrity(100);
    setStageIndex(0);
    setStageTimer(25);
    setGameOver(false);
    setGameWon(false);

    setStageBanner({
      title: "🛡️ CYBER DEFENSE ONLINE",
      sub: "PROTECT SRI SAKTHI'S PORTFOLIO FROM VIRUSES!",
    });
    setTimeout(() => {
      setStageBanner(null);
      gameStateRef.current.stageTransitioning = false; // Resume action after popup fades
    }, 2000);

    updateContentCorruption(100);
    updateSectionTops();
    scrollToStageSection(0);
  }, [spawnStageViruses, scrollToStageSection, updateContentCorruption, updateSectionTops]);

  // Fire Player Laser
  const fireLaser = useCallback(() => {
    const gs = gameStateRef.current;
    if (gs.lives <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const shipCenter = gs.x + SHIP_W / 2;
    const shipTop = getShipY(canvas.height);

    if (gs.tripleTimer > 0) {
      // Triple Laser Spread
      gs.lasers.push({ x: shipCenter - 3, y: shipTop, vx: 0, vy: -13, color: "#00E5FF" });
      gs.lasers.push({ x: shipCenter - 8, y: shipTop, vx: -3, vy: -12, color: "#00E5FF" });
      gs.lasers.push({ x: shipCenter + 2, y: shipTop, vx: 3, vy: -12, color: "#00E5FF" });
    } else {
      // Standard Laser
      gs.lasers.push({ x: shipCenter - 3, y: shipTop, vx: 0, vy: -13, color: "#64FFDA" });
    }
  }, []);

  // Keyboard & Mouse Listeners
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e) => {
      const k = gameStateRef.current.keys;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        k.left = true;
        e.preventDefault();
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        k.right = true;
        e.preventDefault();
      }
      if (
        e.key === " " ||
        e.key === "Enter" ||
        e.key === "ArrowUp" ||
        e.key === "w" ||
        e.key === "W" ||
        e.key === "k" ||
        e.key === "K"
      ) {
        k.fire = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      const k = gameStateRef.current.keys;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        k.left = false;
        e.preventDefault();
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        k.right = false;
        e.preventDefault();
      }
      if (
        e.key === " " ||
        e.key === "Enter" ||
        e.key === "ArrowUp" ||
        e.key === "w" ||
        e.key === "W" ||
        e.key === "k" ||
        e.key === "K"
      ) {
        k.fire = false;
        e.preventDefault();
      }
    };

    const handleBlur = () => {
      const k = gameStateRef.current.keys;
      k.left = false;
      k.right = false;
      k.fire = false;
    };

    const handleMouseDown = (e) => {
      if (
        e.target.closest(".game-toggle-fixed") ||
        e.target.closest(".fullsite-retro-hud") ||
        e.target.closest(".fullsite-modal") ||
        e.target.closest(".mobile-touch-controls") ||
        e.target.closest(".navbar") ||
        e.target.closest("a") ||
        e.target.closest("button")
      ) {
        return;
      }
      if (e.button === 0) fireLaser();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("resize", updateSectionTops);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("resize", updateSectionTops);
    };
  }, [active, fireLaser, updateSectionTops]);

  // Main Canvas Render Loop
  useEffect(() => {
    if (!active) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      updateContentCorruption(100);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initGame();

    const ctx = canvas.getContext("2d");
    let lastTime = performance.now();

    const renderLoop = (now) => {
      const dt = Math.min((now - lastTime) / 16.67, 2);
      lastTime = now;

      const gs = gameStateRef.current;
      const currentScrollY = window.scrollY;

      if (canvas.width !== window.innerWidth) canvas.width = window.innerWidth;
      if (canvas.height !== window.innerHeight) canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isNaN(gs.x) || typeof gs.x !== "number") {
        gs.x = (canvas.width || window.innerWidth) / 2 - SHIP_W / 2;
      }

      const isGameActive = gs.lives > 0 && !gameOver && !gameWon;

      if (isGameActive) {
        if (!gs.stageTransitioning) {
          // Timers update
          if (gs.freezeTimer > 0) gs.freezeTimer -= (1 / 60) * dt;
          if (gs.tripleTimer > 0) gs.tripleTimer -= (1 / 60) * dt;

          // Rare Booster Spawner (Every 20s)
          gs.autoBoosterTimer += (1 / 60) * dt;
          if (gs.autoBoosterTimer >= 20.0) {
            gs.autoBoosterTimer = 0;
            const bstDef = BOOSTER_TYPES[Math.floor(Math.random() * BOOSTER_TYPES.length)];
            const rx = 60 + Math.random() * (canvas.width - 120);
            gs.boosters.push({
              x: rx,
              y: 80,
              ...bstDef,
            });
          }

          // Manual Scroll detection for stage advance (cached tops & auto-scroll guard)
          if (!gs.stageTransitioning && !isAutoScrollingRef.current) {
            for (let i = SECTOR_STAGES.length - 1; i > gs.stageIndex; i--) {
              const top = sectionTopsRef.current[i] || 0;
              if (top > 0 && currentScrollY >= top - 250) {
                loadStage(i);
                break;
              }
            }
          }

          // Stage Timer tick
          if (gs.freezeTimer <= 0) {
            gs.stageTimerAcc += (1 / 60) * dt;
            if (gs.stageTimerAcc >= 1) {
              gs.stageTimerAcc = 0;
              gs.stageTimer -= 1;
              setStageTimer(gs.stageTimer);

              // Time decay causes website corruption
              gs.integrity = Math.max(0, gs.integrity - 1.5);
              setIntegrity(Math.round(gs.integrity));
              updateContentCorruption(gs.integrity);

              // Timeout check
              if (gs.stageTimer <= 0 || gs.integrity <= 0) {
                setGameOver(true);
              }
            }
          }
        }

        // Player Movement
        if (gs.keys.left || gs.touchDir === -1) gs.x -= 10 * dt;
        if (gs.keys.right || gs.touchDir === 1) gs.x += 10 * dt;
        gs.x = Math.max(15, Math.min(canvas.width - SHIP_W - 15, gs.x));

        // Auto Fire
        if (gs.keys.fire) {
          gs.fireTimer += dt;
          if (gs.fireTimer >= (gs.tripleTimer > 0 ? 7 : 9)) {
            gs.fireTimer = 0;
            fireLaser();
          }
        }
      }

      // ALWAYS Render Canvas Visual Elements (Ship, Enemies, Boosters, Lasers, Particles)
      // Render Lasers
      gs.lasers.forEach((lz, lIdx) => {
        if (isGameActive) {
          lz.x += (lz.vx || 0) * dt;
          lz.y += lz.vy * dt;
        }
        if (lz.y < 50) {
          gs.lasers.splice(lIdx, 1);
          return;
        }

        ctx.save();
        ctx.fillStyle = lz.color || "#64FFDA";
        ctx.shadowColor = lz.color || "#64FFDA";
        ctx.shadowBlur = 10;
        ctx.fillRect(lz.x, lz.y, 5, 14);
        ctx.restore();
      });

      // Render Enemy Lasers (Attacks on player)
      gs.enemyLasers.forEach((elz, elIdx) => {
        if (isGameActive) {
          elz.y += elz.vy * dt;
        }
        if (elz.y > canvas.height + 20) {
          gs.enemyLasers.splice(elIdx, 1);
          return;
        }

        ctx.save();
        ctx.fillStyle = "#FF5252";
        ctx.shadowColor = "#FF5252";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(elz.x, elz.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Check hit on player ship
        if (isGameActive) {
          const shipY = getShipY(canvas.height);
          if (
            elz.x >= gs.x &&
            elz.x <= gs.x + SHIP_W &&
            elz.y >= shipY &&
            elz.y <= shipY + SHIP_H
          ) {
            gs.enemyLasers.splice(elIdx, 1);
            gs.lives -= 1;
            gs.integrity = Math.max(0, gs.integrity - 10);
            setLives(gs.lives);
            setIntegrity(Math.round(gs.integrity));
            updateContentCorruption(gs.integrity);
            triggerToast("⚠️ SHIP HIT BY VIRUS BOLT!");

            if (gs.lives <= 0 || gs.integrity <= 0) setGameOver(true);
          }
        }
      });

      // Render Boosters Floating
      gs.boosters.forEach((bst, bIdx) => {
        if (isGameActive) {
          bst.y += 1.8 * dt;
        }
        if (bst.y > canvas.height + 30) {
          gs.boosters.splice(bIdx, 1);
          return;
        }

        ctx.save();
        ctx.font = "22px sans-serif";
        ctx.fillText(bst.icon, bst.x, bst.y);
        ctx.restore();

        // Check pickup by player ship
        if (isGameActive) {
          const shipY = getShipY(canvas.height);
          if (
            bst.x + 12 >= gs.x &&
            bst.x - 12 <= gs.x + SHIP_W &&
            bst.y >= shipY - 10 &&
            bst.y <= shipY + SHIP_H + 15
          ) {
            gs.boosters.splice(bIdx, 1);

            // Apply Booster Effects
            if (bst.type === "SHIELD") {
              gs.lives = Math.min(3, gs.lives + 1);
              gs.integrity = Math.min(100, gs.integrity + 25);
              setLives(gs.lives);
              setIntegrity(Math.round(gs.integrity));
              updateContentCorruption(gs.integrity);
              triggerToast("🛡️ FIREWALL SHIELD (+25% INTEGRITY)");
            } else if (bst.type === "TRIPLE") {
              gs.tripleTimer = 8.0;
              triggerToast("⚡ TRIPLE LASER ACTIVATED!");
            } else if (bst.type === "EMP") {
              // Destroy all active enemies with particles
              gs.enemies.forEach((e) => {
                gs.score += 150;
                const eScreenY = e.docY - currentScrollY;
                for (let p = 0; p < 10; p++) {
                  const angle = Math.random() * Math.PI * 2;
                  const spd = 2 + Math.random() * 4;
                  gs.particles.push({
                    x: e.x + e.w / 2,
                    y: eScreenY + e.h / 2,
                    vx: Math.cos(angle) * spd,
                    vy: Math.sin(angle) * spd,
                    color: e.color,
                    life: 1,
                  });
                }
              });
              gs.enemies = [];
              setScore(gs.score);
              triggerToast("💣 EMP NUKE CLEARED ALL VIRUSES!");
            } else if (bst.type === "FREEZE") {
              gs.freezeTimer = 5.0;
              triggerToast("⏳ TIME FREEZE ACTIVATED (5s)");
            }
          }
        }
      });

      // Top-Level Stage Clear Check (Triggers for EMP bomb or laser kills)
      if (isGameActive && gs.enemies.length === 0 && !gs.stageTransitioning) {
        gs.stageTransitioning = true;
        setTimeout(() => {
          if (gs.stageIndex + 1 < SECTOR_STAGES.length) {
            loadStage(gs.stageIndex + 1);
          } else {
            setGameWon(true);
          }
        }, 450);
      }

      // Render Viruses (Enemies)
      const isFrozen = gs.freezeTimer > 0 || gs.stageTransitioning;
      gs.enemies.forEach((en, eIdx) => {
        if (isGameActive && !isFrozen) {
          en.x += en.vx * dt;
          if (en.x < 30 || en.x > canvas.width - en.w - 30) en.vx *= -1;

          // Enemy Shooting logic
          if (en.shooter) {
            en.shootCooldown -= 1 * dt;
            if (en.shootCooldown <= 0) {
              en.shootCooldown = en.shootInterval;
              const screenY = en.docY - currentScrollY;
              if (screenY > 40 && screenY < canvas.height - 150) {
                gs.enemyLasers.push({
                  x: en.x + en.w / 2,
                  y: screenY + en.h,
                  vy: 4.5,
                });
              }
            }
          }
        }

        const screenY = en.docY - currentScrollY;
        if (screenY < -60 || screenY > canvas.height + 60) return;

        ctx.save();
        ctx.fillStyle = en.color;
        ctx.shadowColor = en.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(en.x, screenY, en.w, en.h, 6);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 10px monospace";
        ctx.fillText(en.type, en.x - 2, screenY - 5);
        ctx.restore();

        // Laser Hits on Enemy
        if (isGameActive) {
          gs.lasers.forEach((lz, lIdx) => {
            if (
              lz.x + 6 >= en.x - 4 &&
              lz.x <= en.x + en.w + 4 &&
              lz.y >= screenY - 6 &&
              lz.y <= screenY + en.h + 6
            ) {
              en.hp -= 1;
              gs.lasers.splice(lIdx, 1);

              if (en.hp <= 0) {
                // Explosion particles
                for (let p = 0; p < 12; p++) {
                  const angle = Math.random() * Math.PI * 2;
                  const spd = 2 + Math.random() * 3;
                  gs.particles.push({
                    x: en.x + en.w / 2,
                    y: screenY + en.h / 2,
                    vx: Math.cos(angle) * spd,
                    vy: Math.sin(angle) * spd,
                    color: en.color,
                    life: 1,
                  });
                }

                // 20% reduced chance to drop Booster Token on enemy kill
                if (Math.random() < 0.20) {
                  const bstDef = BOOSTER_TYPES[Math.floor(Math.random() * BOOSTER_TYPES.length)];
                  gs.boosters.push({
                    x: en.x + en.w / 2,
                    y: screenY + en.h,
                    ...bstDef,
                  });
                }

                gs.enemies.splice(eIdx, 1);
                gs.score += 150;
                gs.integrity = Math.min(100, gs.integrity + 4);
                setScore(gs.score);
                setIntegrity(Math.round(gs.integrity));
                updateContentCorruption(gs.integrity);
              }
            }
          });
        }
      });

      // Particle System
      gs.particles.forEach((p, pIdx) => {
        if (isGameActive) {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.05;
        }
        if (p.life <= 0) {
          gs.particles.splice(pIdx, 1);
          return;
        }
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
        ctx.restore();
      });

      // Draw Sri Sakthi's Cyber Defense Ship
      const shipY = getShipY(canvas.height);
      ctx.save();
      ctx.translate(gs.x, shipY);

      ctx.fillStyle = gs.tripleTimer > 0 ? "#00E5FF" : "#64FFDA";
      ctx.shadowColor = gs.tripleTimer > 0 ? "#00E5FF" : "#64FFDA";
      ctx.shadowBlur = 16;

      ctx.beginPath();
      ctx.moveTo(SHIP_W / 2, 0);
      ctx.lineTo(SHIP_W, SHIP_H);
      ctx.lineTo(SHIP_W * 0.7, SHIP_H * 0.75);
      ctx.lineTo(SHIP_W * 0.3, SHIP_H * 0.75);
      ctx.lineTo(0, SHIP_H);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      animRef.current = requestAnimationFrame(renderLoop);
    };

    animRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [active, initGame, loadStage, updateContentCorruption, triggerToast, fireLaser]);

  if (!active) return null;

  const currentStageInfo = SECTOR_STAGES[stageIndex];

  return (
    <>
      {/* Full-Website Canvas Layer */}
      <canvas ref={canvasRef} className="fullsite-retro-canvas" />

      {/* Floating HUD */}
      <div className="fullsite-retro-hud">
        <div className="hud-item">
          <span>SECTOR: <strong style={{ color: "#00E5FF" }}>{currentStageInfo.name}</strong> ({stageIndex + 1}/5)</span>
        </div>
        <div className="hud-item">
          <span>TIMER: <strong style={{ color: stageTimer <= 5 ? "#FF5252" : "#FFB300" }}>{stageTimer}s</strong></span>
        </div>
        <div className="hud-item">
          <span>INTEGRITY:</span>
          <div className="hud-integrity-bar-wrap">
            <div
              className={`hud-integrity-bar-fill ${integrity <= 35 ? "critical" : integrity <= 65 ? "warning" : ""}`}
              style={{ width: `${integrity}%` }}
            />
          </div>
        </div>
        <div className="hud-item">
          <span>HPs: <strong style={{ color: "#FF5252" }}>{"♥".repeat(lives)}</strong></span>
        </div>
        <div className="hud-item">
          <span>SCORE: <strong style={{ color: "#00E676" }}>{score}</strong></span>
        </div>
      </div>

      {/* Stage Clear Banner Overlay */}
      {stageBanner && (
        <div className="stage-clear-overlay">
          <div className="stage-clear-title">{stageBanner.title}</div>
          <div className="stage-clear-sub">{stageBanner.sub}</div>
        </div>
      )}

      {/* Translucent Low-Opacity Mobile Controls Overlay */}
      <div className="mobile-touch-controls">
        <button
          className="touch-ctrl-btn touch-btn-left"
          onTouchStart={(e) => {
            e.preventDefault();
            gameStateRef.current.touchDir = -1;
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            gameStateRef.current.touchDir = 0;
          }}
          onMouseDown={() => {
            gameStateRef.current.touchDir = -1;
          }}
          onMouseUp={() => {
            gameStateRef.current.touchDir = 0;
          }}
          aria-label="Move Left"
        >
          ◄ LEFT
        </button>
        <button
          className="touch-ctrl-btn touch-btn-fire"
          onTouchStart={(e) => {
            e.preventDefault();
            fireLaser();
            gameStateRef.current.keys.fire = true;
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            gameStateRef.current.keys.fire = false;
          }}
          onMouseDown={() => {
            fireLaser();
            gameStateRef.current.keys.fire = true;
          }}
          onMouseUp={() => {
            gameStateRef.current.keys.fire = false;
          }}
          aria-label="Fire Laser"
        >
          ⚡ FIRE
        </button>
        <button
          className="touch-ctrl-btn touch-btn-right"
          onTouchStart={(e) => {
            e.preventDefault();
            gameStateRef.current.touchDir = 1;
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            gameStateRef.current.touchDir = 0;
          }}
          onMouseDown={() => {
            gameStateRef.current.touchDir = 1;
          }}
          onMouseUp={() => {
            gameStateRef.current.touchDir = 0;
          }}
          aria-label="Move Right"
        >
          RIGHT ►
        </button>
      </div>

      {/* Floating Toast Notification */}
      {toastMsg && <div className="booster-pickup-toast">{toastMsg}</div>}

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fullsite-modal game-over">
          <div className="modal-title">⚠️ SYSTEM OVERRUN BY VIRUSES</div>
          <div className="modal-sub">Portfolio integrity dropped to 0%. Website corrupted!</div>
          <button className="modal-btn" onClick={initGame}>
            RETRY CYBER DEFENSE
          </button>
        </div>
      )}

      {/* Game Won Modal */}
      {gameWon && (
        <div className="fullsite-modal won">
          <div className="modal-title">🏆 SRI SAKTHI'S PORTFOLIO SAVED!</div>
          <div className="modal-sub">You cleared all 5 sectors, destroyed the viruses & restored 100% integrity!</div>
          <button className="modal-btn" onClick={initGame}>
            PLAY AGAIN
          </button>
        </div>
      )}
    </>
  );
}
