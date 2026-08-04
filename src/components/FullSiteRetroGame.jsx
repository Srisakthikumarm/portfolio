import React, { useRef, useEffect, useState, useCallback } from "react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import { BombIcon, HourglassIcon } from "../App";
import {
  playCharacterSpawnSound,
  playLaserSound,
  playEnemyExplodeSound,
  playPlayerHitSound,
  playShieldPickupSound,
  playTriplePickupSound,
  playEmpPickupSound,
  playFreezePickupSound,
  playGameStartJingle,
  playStageClearJingle,
  playGameVictorySound,
  playShipDestroyedDefeatSound,
  playTimerExpiredDefeatSound,
  playWebsiteInfectedDefeatSound,
  createRetroBattleSongWavUrl,
} from "../utils/gameSoundEffects";
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
  { type: "404_VIRUS", color: "#F24E1E", hp: 1, speed: 1.1, shooter: false },
  { type: "TROJAN.UX", color: "#E34F26", hp: 1, speed: 0.9, shooter: true, shootInterval: 140 },
  { type: "LOGIC_BOMB", color: "#8B5CF6", hp: 2, speed: 0.7, shooter: true, shootInterval: 110 },
  { type: "MALWARE.EXE", color: "#0055FF", hp: 2, speed: 1.0, shooter: true, shootInterval: 90 },
];

const BOOSTER_TYPES = [
  { type: "SHIELD", icon: "🛡️", name: "FIREWALL SHIELD", color: "#10B981" },
  { type: "TRIPLE", icon: "⚡", name: "TRIPLE LASER", color: "#0055FF" },
  { type: "EMP", icon: "💣", name: "EMP NUKE", color: "#F24E1E" },
  { type: "FREEZE", icon: "⏳", name: "TIME FREEZE", color: "#8B5CF6" },
];

export default function FullSiteRetroGame({ active, musicState }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const battleAudioRef = useRef(null);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [stageIndex, setStageIndex] = useState(0);
  const [stageTimer, setStageTimer] = useState(25);
  const [integrity, setIntegrity] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState("integrity"); // "lives" | "timer" | "integrity"
  const [gameWon, setGameWon] = useState(false);
  const [stageBanner, setStageBanner] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const [battleAudioSrc, setBattleAudioSrc] = useState("");

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
    invincibleTimer: 0,
    stageTransitioning: false,
  });

  const lastCorruptionRef = useRef("");
  const isAutoScrollingRef = useRef(false);
  const sectionTopsRef = useRef([]);

  // Generate High-Energy Action Retro Battle Song WAV URL when Game Mode is active
  useEffect(() => {
    if (active) {
      const url = createRetroBattleSongWavUrl();
      setBattleAudioSrc(url);
      return () => {
        if (url) URL.revokeObjectURL(url);
      };
    } else {
      setBattleAudioSrc("");
    }
  }, [active]);

  // Sync game battle audio playback and volume with top navbar music controls & popup banner pauses
  useEffect(() => {
    if (!active) {
      if (battleAudioRef.current) {
        battleAudioRef.current.pause();
      }
      return;
    }
    if (active && battleAudioRef.current && battleAudioSrc) {
      const isPlaying = musicState?.isPlaying ?? true;
      const isMuted = musicState?.isMuted ?? false;
      const vol = musicState?.volume ?? 0.4;
      const isTransitioning = gameStateRef.current?.stageTransitioning;
      const isEnded = gameOver || gameWon;

      battleAudioRef.current.volume = isMuted ? 0 : Math.min(1.0, Math.max(0, vol));

      if (!isPlaying || isMuted || document.hidden || isTransitioning || isEnded) {
        battleAudioRef.current.pause();
      } else {
        battleAudioRef.current.play().catch(() => {});
      }
    }
  }, [active, battleAudioSrc, musicState?.isPlaying, musicState?.isMuted, musicState?.volume, gameOver, gameWon, Boolean(stageBanner)]);

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

  // Recalculate top offsets for all section targets
  const updateSectionTops = useCallback(() => {
    sectionTopsRef.current = SECTOR_STAGES.map((s) => {
      const el = document.querySelector(s.selector);
      return el ? getAbsoluteElementTop(el) : 0;
    });
  }, []);

  // Update Website Glitch Corruption Visual Overlay
  const updateContentCorruption = useCallback((currentIntegrity) => {
    const contentEl = document.querySelector(".content-container");
    if (!contentEl) return;

    let targetClass = "";
    if (currentIntegrity <= 25) {
      targetClass = "website-corrupted-critical";
    } else if (currentIntegrity <= 45) {
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

  // Spawn viruses for a specific stage index
  const spawnStageViruses = useCallback((stageIdx) => {
    const w = window.innerWidth;
    const stageInfo = SECTOR_STAGES[stageIdx];
    const targetEl = document.querySelector(stageInfo?.selector || "#intro");
    const baseScrollY = targetEl
      ? getAbsoluteElementTop(targetEl)
      : stageIdx * 700 + 200;

    const newEnemies = [];
    const count = stageInfo?.virusCount || 4;
    for (let i = 0; i < count; i++) {
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

  // Smooth scroll page to newly unlocked sector section
  const smoothScrollToStage = useCallback((stageIdx) => {
    const stage = SECTOR_STAGES[stageIdx];
    if (!stage) return;
    const targetEl = document.querySelector(stage.selector);
    if (targetEl) {
      const topOffset = getAbsoluteElementTop(targetEl) - 90;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
    }
  }, []);

  // Initialize or transition to a stage (keeps remaining timer, strictly sequential)
  const loadStage = useCallback(
    (stageIdx) => {
      const gs = gameStateRef.current;
      gs.stageIndex = stageIdx;
      gs.enemies = spawnStageViruses(stageIdx);
      gs.lasers = [];
      gs.enemyLasers = [];
      gs.boosters = [];
      gs.stageTransitioning = true; // Pause action while banner popup is showing

      playStageClearJingle();
      setStageIndex(stageIdx);

      const stageInfo = SECTOR_STAGES[stageIdx];
      setStageBanner({
        icon: <BoltRoundedIcon style={{ fontSize: 13, color: "#F7DF1E" }} />,
        iconClass: "purple",
        title: `${stageInfo.name} SECURED!`,
        sub: `SECTOR ${stageIdx + 1} OF ${SECTOR_STAGES.length} INITIALIZED`,
      });
      setTimeout(() => {
        setStageBanner(null);
        gameStateRef.current.stageTransitioning = false; // Resume action after popup fades
      }, 1800);

      updateSectionTops();
      smoothScrollToStage(stageIdx);
    },
    [spawnStageViruses, smoothScrollToStage, updateSectionTops]
  );

  // Full game initialization
  const initGame = useCallback(() => {
    const w = window.innerWidth;
    updateSectionTops();
    playCharacterSpawnSound();
    playGameStartJingle();

    // Position character X right out from the GAME MODE button so users see it immediately!
    const gameBtnEl = document.querySelector(".game-toggle-btn");
    let spawnX = w / 2 - SHIP_W / 2;
    if (gameBtnEl) {
      const rect = gameBtnEl.getBoundingClientRect();
      spawnX = Math.max(20, Math.min(w - SHIP_W - 20, rect.left + rect.width / 2 - SHIP_W / 2));
    }

    const spawnParticles = [];
    for (let p = 0; p < 16; p++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 4;
      spawnParticles.push({
        x: spawnX + SHIP_W / 2,
        y: 80,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        color: "#FFFFFF",
        life: 1,
      });
    }

    gameStateRef.current = {
      x: spawnX,
      portalAnim: 0.0,
      portalStartY: 80,
      lasers: [],
      enemyLasers: [],
      enemies: spawnStageViruses(0),
      boosters: [],
      particles: spawnParticles,
      keys: { left: false, right: false, fire: false },
      touchDir: 0,
      fireTimer: 0,
      score: 0,
      lives: 3,
      integrity: 100,
      stageIndex: 0,
      stageTimer: 75,
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
    setStageTimer(75);
    setGameOver(false);
    setGameWon(false);

    setStageBanner({
      icon: <ShieldRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />,
      iconClass: "blue",
      title: "CYBER DEFENSE ONLINE",
      sub: "STAGE 1 / 5: HERO SECTOR - PROTECT SRI SAKTHI'S PORTFOLIO!",
    });
    setTimeout(() => {
      setStageBanner(null);
      gameStateRef.current.stageTransitioning = false; // Resume action after popup fades
    }, 1800);

    window.scrollTo({ top: 0, behavior: "smooth" });
    updateContentCorruption(100);
  }, [spawnStageViruses, updateContentCorruption, updateSectionTops]);

  // Restart game after winning or defeat (scrolls back to Stage 1 & resets)
  const restartGame = useCallback(() => {
    smoothScrollToStage(0);
    initGame();
  }, [initGame, smoothScrollToStage]);

  // Fire Player Laser (Plays Laser Sound!)
  const fireLaser = useCallback(() => {
    const gs = gameStateRef.current;
    if (gs.lives <= 0 || gs.gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    playLaserSound();

    const shipCenter = gs.x + SHIP_W / 2;
    const shipTop = gs.currentShipY || getShipY(canvas.height);

    if (gs.tripleTimer > 0) {
      gs.lasers.push(
        { x: shipCenter - 14, y: shipTop, vy: -14 },
        { x: shipCenter, y: shipTop - 6, vy: -15 },
        { x: shipCenter + 14, y: shipTop, vy: -14 }
      );
    } else {
      gs.lasers.push({ x: shipCenter, y: shipTop, vy: -14 });
    }
  }, []);

  // Helper function to trigger floating toast notifications
  const triggerToast = useCallback((msg, icon, iconClass = "purple") => {
    setToastMsg({ msg, icon, iconClass });
    setTimeout(() => setToastMsg(null), 2500);
  }, []);

  // Setup canvas size, event listeners, & render loop
  useEffect(() => {
    if (!active) return;
    initGame();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      const gs = gameStateRef.current;
      if (gs) {
        // Clamp ship X to visible viewport width
        gs.x = Math.max(20, Math.min(w - SHIP_W - 20, gs.x));

        // Clamp active enemies to visible viewport width
        if (gs.enemies) {
          gs.enemies.forEach((en) => {
            const maxEnemyX = Math.max(30, w - en.w - 30);
            en.x = Math.max(30, Math.min(maxEnemyX, en.x));
          });
        }

        // Clamp active booster tokens
        if (gs.boosters) {
          gs.boosters.forEach((bst) => {
            bst.x = Math.max(30, Math.min(w - 30, bst.x));
          });
        }
      }

      updateSectionTops();
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("orientationchange", resizeCanvas);

    // Keyboard handlers
    const handleKeyDown = (e) => {
      const gs = gameStateRef.current;
      if (e.code === "ArrowLeft" || e.code === "KeyA") gs.keys.left = true;
      if (e.code === "ArrowRight" || e.code === "KeyD") gs.keys.right = true;
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        if (!gs.keys.fire) fireLaser();
        gs.keys.fire = true;
      }
    };

    const handleKeyUp = (e) => {
      const gs = gameStateRef.current;
      if (e.code === "ArrowLeft" || e.code === "KeyA") gs.keys.left = false;
      if (e.code === "ArrowRight" || e.code === "KeyD") gs.keys.right = false;
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") gs.keys.fire = false;
    };

    // Mouse / Touch click handler to fire laser anywhere on screen
    const handleMouseDown = (e) => {
      if (e.target && (e.target.closest("button") || e.target.closest("a") || e.target.closest("input"))) return;
      fireLaser();
    };

    // Auto-Pause Game & Audio when user leaves page / switches tabs
    const handleVisibilityChange = () => {
      const gs = gameStateRef.current;
      if (document.hidden) {
        gs.isPaused = true;
        if (battleAudioRef.current) battleAudioRef.current.pause();
      } else {
        gs.isPaused = false;
        if (battleAudioRef.current && active) {
          battleAudioRef.current.play().catch(() => {});
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("pointerdown", handleMouseDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Scroll tracker to update current active section index without skipping stages
    const handleScroll = () => {
      const gs = gameStateRef.current;
      if (gs.stageTransitioning) return;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Main Canvas Game Render & Physics Loop
    let lastTime = performance.now();
    const renderLoop = (nowTime) => {
      const dt = Math.min((nowTime - lastTime) / 1000, 0.1) * 60;
      lastTime = nowTime;

      const ctx = canvas.getContext("2d");
      const gs = gameStateRef.current;

      // Skip render & physics if tab is paused
      if (gs.isPaused) {
        animRef.current = requestAnimationFrame(renderLoop);
        return;
      }
      const currentScrollY = window.scrollY;
      const isGameActive = gs.lives > 0 && gs.integrity > 0 && !gameOver && !gameWon;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Timers & Booster Cooldown Physics
      if (isGameActive) {
        if (gs.freezeTimer > 0) gs.freezeTimer -= (1 / 60) * dt;
        if (gs.tripleTimer > 0) gs.tripleTimer -= (1 / 60) * dt;
        if (gs.invincibleTimer > 0) gs.invincibleTimer -= (1 / 60) * dt;

        // Stage Timer Countdown
        gs.stageTimerAcc += (1 / 60) * dt;
        if (gs.stageTimerAcc >= 1.0) {
          gs.stageTimerAcc = 0;
          gs.stageTimer = Math.max(0, gs.stageTimer - 1);
          setStageTimer(gs.stageTimer);

          if (gs.stageTimer <= 0) {
            playTimerExpiredDefeatSound();
            setGameOverReason("timer");
            setGameOver(true);
          }
        }

        // Automatic Booster Token Spawn
        gs.autoBoosterTimer += (1 / 60) * dt;
        if (gs.autoBoosterTimer >= 10.0) {
          gs.autoBoosterTimer = 0;
          const bstDef = BOOSTER_TYPES[Math.floor(Math.random() * BOOSTER_TYPES.length)];
          gs.boosters.push({
            x: 80 + Math.random() * (canvas.width - 160),
            y: 60,
            ...bstDef,
          });
        }
      }

      // Continuous Fire Rate Handler
      if (gs.keys.fire && isGameActive) {
        gs.fireTimer += 1 * dt;
        if (gs.fireTimer >= 12) {
          fireLaser();
          gs.fireTimer = 0;
        }
      }

      // Ship Movement Controls (Keyboard & Touch)
      if (isGameActive) {
        const speed = 7.5 * dt;
        if (gs.keys.left || gs.touchDir < 0) gs.x -= speed;
        if (gs.keys.right || gs.touchDir > 0) gs.x += speed;
        gs.x = Math.max(30, Math.min(canvas.width - SHIP_W - 30, gs.x));
      }

      // Render Player Lasers (Original Retro Pixel Style)
      gs.lasers.forEach((lz, idx) => {
        if (isGameActive) lz.y += lz.vy * dt;
        if (lz.y < -20) {
          gs.lasers.splice(idx, 1);
          return;
        }
        ctx.fillStyle = gs.tripleTimer > 0 ? "#0055FF" : "#000000";
        ctx.fillRect(lz.x - 2, lz.y, 4, 14);
      });

      // Render Enemy Lasers (Hits Player Ship -> Plays Hit Sound!)
      gs.enemyLasers.forEach((el, elIdx) => {
        if (isGameActive) el.y += el.vy * dt;
        if (el.y > canvas.height + 20) {
          gs.enemyLasers.splice(elIdx, 1);
          return;
        }

        ctx.fillStyle = "#F24E1E";
        ctx.beginPath();
        ctx.arc(el.x, el.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Check hit on player ship
        if (isGameActive) {
          const shipY = getShipY(canvas.height);
          if (
            el.x >= gs.x &&
            el.x <= gs.x + SHIP_W &&
            el.y >= shipY &&
            el.y <= shipY + SHIP_H
          ) {
            gs.enemyLasers.splice(elIdx, 1);

            // Invincibility cooldown check (prevents losing all 3 lives on 1 frame!)
            if (gs.invincibleTimer > 0) return;

            playPlayerHitSound();
            const nextLives = Math.max(0, gs.lives - 1);
            gs.lives = nextLives;
            gs.invincibleTimer = 1.2; // 1.2s I-frame protection!
            setLives(nextLives);

            triggerToast(`SHIP HIT BY VIRUS BOLT! (${nextLives} HP REMAINING)`, <WarningRoundedIcon style={{ fontSize: 11, color: "#FFFFFF" }} />, "coral");

            if (nextLives <= 0) {
              playShipDestroyedDefeatSound();
              setGameOverReason("lives");
              setGameOver(true);
            }
          }
        }
      });

      // Render Boosters Floating inside retro pixel badge boxes (Unique Sound Per Booster!)
      gs.boosters.forEach((bst, bIdx) => {
        if (isGameActive) {
          bst.y += 1.8 * dt;
        }
        if (bst.y >= canvas.height - 10) {
          gs.boosters.splice(bIdx, 1);
          return;
        }

        ctx.save();
        const boxSize = 22;
        const boxX = bst.x - boxSize / 2;
        const boxY = bst.y - boxSize / 2;

        // Draw hard black shadow
        ctx.fillStyle = "#000000";
        ctx.fillRect(boxX + 2, boxY + 2, boxSize, boxSize);

        // Draw background color box matching website palette
        ctx.fillStyle =
          bst.type === "SHIELD"
            ? "#0055FF"
            : bst.type === "TRIPLE"
            ? "#8B5CF6"
            : bst.type === "EMP"
            ? "#F24E1E"
            : "#F59E0B";
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxSize, boxSize, 3);
        ctx.fill();

        // Draw black border
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw crisp vector icon inside booster badge box
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.2;

        if (bst.type === "SHIELD") {
          // Draw Shield vector icon
          ctx.beginPath();
          ctx.moveTo(bst.x - 5, bst.y - 5);
          ctx.lineTo(bst.x + 5, bst.y - 5);
          ctx.lineTo(bst.x + 5, bst.y + 1);
          ctx.quadraticCurveTo(bst.x + 5, bst.y + 6, bst.x, bst.y + 7);
          ctx.quadraticCurveTo(bst.x - 5, bst.y + 6, bst.x - 5, bst.y + 1);
          ctx.closePath();
          ctx.fill();
        } else if (bst.type === "TRIPLE") {
          // Draw Lightning Bolt vector icon
          ctx.beginPath();
          ctx.moveTo(bst.x + 1, bst.y - 6);
          ctx.lineTo(bst.x - 5, bst.y);
          ctx.lineTo(bst.x - 1, bst.y);
          ctx.lineTo(bst.x - 2, bst.y + 6);
          ctx.lineTo(bst.x + 4, bst.y - 1);
          ctx.lineTo(bst.x, bst.y - 1);
          ctx.closePath();
          ctx.fill();
        } else if (bst.type === "EMP") {
          // Draw Bomb / Nuke vector icon
          ctx.beginPath();
          ctx.arc(bst.x, bst.y + 2, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(bst.x, bst.y - 3);
          ctx.lineTo(bst.x + 3, bst.y - 6);
          ctx.stroke();
        } else if (bst.type === "FREEZE") {
          // Draw Hourglass vector icon
          ctx.beginPath();
          ctx.moveTo(bst.x - 4, bst.y - 5);
          ctx.lineTo(bst.x + 4, bst.y - 5);
          ctx.lineTo(bst.x, bst.y);
          ctx.lineTo(bst.x + 4, bst.y + 5);
          ctx.lineTo(bst.x - 4, bst.y + 5);
          ctx.lineTo(bst.x, bst.y);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        // Check pickup by player ship (Plays UNIQUE Sound Per Booster!)
        if (isGameActive) {
          const shipY = getShipY(canvas.height);
          if (
            bst.x + 12 >= gs.x &&
            bst.x - 12 <= gs.x + SHIP_W &&
            bst.y >= shipY - 10 &&
            bst.y <= shipY + SHIP_H + 15
          ) {
            gs.boosters.splice(bIdx, 1);

            // Apply Booster Effects with UNIQUE Sounds!
            if (bst.type === "SHIELD") {
              playShieldPickupSound();
              gs.lives = Math.min(3, gs.lives + 1);
              gs.integrity = Math.min(100, gs.integrity + 25);
              setLives(gs.lives);
              setIntegrity(Math.round(gs.integrity));
              updateContentCorruption(gs.integrity);
              triggerToast("FIREWALL SHIELD (+25% INTEGRITY)", <ShieldRoundedIcon style={{ fontSize: 11, color: "#FFFFFF" }} />, "blue");
            } else if (bst.type === "TRIPLE") {
              playTriplePickupSound();
              gs.tripleTimer = 8.0;
              triggerToast("TRIPLE LASER ACTIVATED!", <BoltRoundedIcon style={{ fontSize: 11, color: "#FFFFFF" }} />, "purple");
            } else if (bst.type === "EMP") {
              playEmpPickupSound();
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
              gs.stageTimer += 5;
              setStageTimer(gs.stageTimer);
              setScore(gs.score);
              triggerToast("EMP NUKE CLEARED ALL VIRUSES! +5s TIME BONUS!", <BombIcon style={{ fontSize: 11, color: "#FFFFFF" }} />, "coral");
            } else if (bst.type === "FREEZE") {
              playFreezePickupSound();
              gs.freezeTimer = 5.0;
              triggerToast("TIME FREEZE ACTIVATED (5s)", <HourglassIcon style={{ fontSize: 11, color: "#FFFFFF" }} />, "amber");
            }
          }
        }
      });

      // Top-Level Stage Clear Check
      if (isGameActive && gs.enemies.length === 0 && !gs.stageTransitioning) {
        gs.stageTransitioning = true;
        setTimeout(() => {
          if (gs.stageIndex + 1 < SECTOR_STAGES.length) {
            loadStage(gs.stageIndex + 1);
          } else {
            playGameVictorySound();
            setGameWon(true);
          }
        }, 450);
      }

      // Render Viruses (Enemies)
      const isFrozen = gs.freezeTimer > 0 || gs.stageTransitioning;

      // Active Viruses damage portfolio website over time (Balanced at ~0.8% per sec for 4 viruses)
      if (isGameActive && !isFrozen && gs.enemies.length > 0) {
        gs.integrity = Math.max(0, gs.integrity - (0.0035 * gs.enemies.length) * dt);
        setIntegrity(Math.round(gs.integrity));
        updateContentCorruption(gs.integrity);

        if (gs.integrity <= 0) {
          playWebsiteInfectedDefeatSound();
          setGameOverReason("integrity");
          setGameOver(true);
        }
      }
      gs.enemies.forEach((en, eIdx) => {
        if (isGameActive && !isFrozen) {
          en.x += en.vx * dt;
          const maxEnemyX = Math.max(30, canvas.width - en.w - 30);
          if (en.x <= 30) {
            en.x = 30;
            en.vx = Math.abs(en.vx);
          } else if (en.x >= maxEnemyX) {
            en.x = maxEnemyX;
            en.vx = -Math.abs(en.vx);
          }

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
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(en.x, screenY, en.w, en.h, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#000000";
        ctx.font = "900 11px monospace";
        ctx.fillText(en.type, en.x - 2, screenY - 6);
        ctx.restore();

        // Laser Hits on Enemy (Plays Enemy Explosion Sound!)
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
                playEnemyExplodeSound();

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

                // 20% chance to drop Booster Token on enemy kill
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

                if (gs.enemies.length === 0) {
                  gs.stageTimer += 5;
                  gs.integrity = Math.min(100, gs.integrity + 5);
                  setStageTimer(gs.stageTimer);
                  triggerToast("LAST VIRUS DESTROYED! +5% INTEGRITY REWARD!", <ShieldRoundedIcon style={{ fontSize: 11, color: "#FFFFFF" }} />, "blue");
                }

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

      // Draw Sri Sakthi's Cyber Defense Ship (Emerging from Portal on GAME MODE button!)
      const targetShipY = getShipY(canvas.height);
      const isPortalActive = gs.portalAnim !== undefined && gs.portalAnim < 1.0;
      
      if (isPortalActive) {
        // Match character descent speed EXACTLY to the falling booster token velocity (1.8 * dt px/frame)!
        const distanceToBottom = Math.max(100, targetShipY - (gs.portalStartY || 80));
        const boosterTravelSec = distanceToBottom / 108; // 108 px/sec (1.8 px/frame @ 60 FPS)
        const animSpeed = 1 / Math.max(0.8, boosterTravelSec);

        gs.portalAnim = Math.min(1.0, gs.portalAnim + dt * animSpeed);
        
        // Spawn bright portal trail particles gliding down
        if (Math.random() < 0.8) {
          const pProg = Math.sin((gs.portalAnim * Math.PI) / 2);
          const trailY = (gs.portalStartY || 80) + (targetShipY - (gs.portalStartY || 80)) * pProg;
          gs.particles.push({
            x: gs.x + SHIP_W / 2 + (Math.random() - 0.5) * 22,
            y: trailY,
            vx: (Math.random() - 0.5) * 3,
            vy: -1.5 - Math.random() * 2,
            color: Math.random() > 0.5 ? "#00FFCC" : Math.random() > 0.5 ? "#FF00FF" : "#F7DF1E",
            life: 0.9,
          });
        }
      }

      // Smooth Quintic Easing Curve for Slow Descent
      const tNorm = isPortalActive ? gs.portalAnim : 1.0;
      const pProgress = isPortalActive
        ? tNorm < 0.5
          ? 4 * tNorm * tNorm * tNorm
          : 1 - Math.pow(-2 * tNorm + 2, 3) / 2
        : 1.0;

      const shipY = isPortalActive
        ? (gs.portalStartY || 80) + (targetShipY - (gs.portalStartY || 80)) * pProgress
        : targetShipY;
      gs.currentShipY = shipY;
      const shipScale = isPortalActive ? 0.2 + 0.8 * pProgress : 1.0;

      // Character Rotation: Starts facing downwards (Math.PI), then slowly turns 180deg to face UPWARDS at enemies!
      let shipRotation = 0;
      if (isPortalActive) {
        if (tNorm < 0.45) {
          shipRotation = Math.PI;
        } else {
          const rotProgress = (tNorm - 0.45) / 0.55;
          const easeRot = Math.sin((rotProgress * Math.PI) / 2);
          shipRotation = Math.PI * (1 - easeRot);
        }
      }

      // Draw Glowing Double Portal Rings at GAME MODE Button Location
      if (isPortalActive) {
        ctx.save();
        ctx.strokeStyle = "#00FFCC";
        ctx.shadowColor = "#00FFCC";
        ctx.shadowBlur = 18;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(gs.x + SHIP_W / 2, gs.portalStartY || 80, 40 * (1 - pProgress * 0.4), 16 * (1 - pProgress * 0.4), 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "#FF00FF";
        ctx.shadowColor = "#FF00FF";
        ctx.shadowBlur = 14;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(gs.x + SHIP_W / 2, gs.portalStartY || 80, 24 * (1 - pProgress * 0.4), 9 * (1 - pProgress * 0.4), 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Draw Floating Step-by-Step Status Label
        ctx.save();
        ctx.font = "900 11px 'DotGothic16', monospace";
        ctx.fillStyle = tNorm > 0.7 ? "#F7DF1E" : tNorm > 0.3 ? "#00FFCC" : "#FF00FF";
        ctx.shadowColor = "#000000";
        ctx.shadowBlur = 5;
        ctx.textAlign = "center";
        const labelText = tNorm > 0.7
          ? "🔄 TURNING TO FACE ENEMIES..."
          : tNorm > 0.3
          ? "🚀 EMERGING & GLIDING DOWN..."
          : "🌀 PORTAL OPENING ON BUTTON...";
        ctx.fillText(labelText, gs.x + SHIP_W / 2, shipY - 18);
        ctx.restore();
      }

      // Draw Character (Scaled, Rotated 180deg to face enemies, with Invincibility Flicker)
      ctx.save();
      if (gs.invincibleTimer > 0 && Math.floor(nowTime / 80) % 2 === 0) {
        ctx.globalAlpha = 0.35;
      }
      ctx.translate(gs.x + SHIP_W / 2, shipY + SHIP_H / 2);
      ctx.scale(shipScale, shipScale);
      ctx.rotate(shipRotation);
      ctx.translate(-SHIP_W / 2, -SHIP_H / 2);

      // Outer Crisp White Border Outline
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 5;
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(SHIP_W / 2, -2);
      ctx.lineTo(SHIP_W + 3, SHIP_H + 2);
      ctx.lineTo(SHIP_W * 0.7, SHIP_H * 0.75 + 1);
      ctx.lineTo(SHIP_W * 0.3, SHIP_H * 0.75 + 1);
      ctx.lineTo(-3, SHIP_H + 2);
      ctx.closePath();
      ctx.stroke();

      // Inner Black/Blue Ship Body
      ctx.fillStyle = gs.tripleTimer > 0 ? "#0055FF" : "#000000";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(SHIP_W / 2, 0);
      ctx.lineTo(SHIP_W, SHIP_H);
      ctx.lineTo(SHIP_W * 0.7, SHIP_H * 0.75);
      ctx.lineTo(SHIP_W * 0.3, SHIP_H * 0.75);
      ctx.lineTo(0, SHIP_H);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      animRef.current = requestAnimationFrame(renderLoop);
    };

    animRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("pointerdown", handleMouseDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [active, initGame, loadStage, updateContentCorruption, triggerToast, fireLaser]);

  if (!active) return null;

  const currentStageInfo = SECTOR_STAGES[stageIndex];

  return (
    <>
      {/* High-Energy Action Retro Battle Song Audio Element */}
      {battleAudioSrc && (
        <audio
          ref={battleAudioRef}
          src={battleAudioSrc}
          autoPlay
          loop
        />
      )}

      {/* Full-Website Canvas Layer */}
      <canvas ref={canvasRef} className="fullsite-retro-canvas" />

      {/* Floating HUD */}
      <div className="fullsite-retro-hud">
        <div className="hud-item">
          <span>SECTOR: <strong style={{ color: "#0055FF" }}>{currentStageInfo.name}</strong> ({stageIndex + 1}/5)</span>
        </div>
        <div className="hud-item">
          <span>TIMER: <strong style={{ color: stageTimer <= 5 ? "#F24E1E" : "#0055FF" }}>{stageTimer}s</strong></span>
        </div>
        <div className="hud-item">
          <span>INTEGRITY:</span>
          <div className="hud-integrity-bar-wrap">
            <div
              className={`hud-integrity-bar-fill ${integrity < 30 ? "critical" : integrity < 60 ? "warning" : ""}`}
              style={{
                width: `${Math.max(0, Math.min(100, integrity))}%`,
                background: integrity > 60 ? "#10B981" : integrity > 30 ? "#F59E0B" : "#F24E1E",
              }}
            />
          </div>
          <span style={{ fontSize: 11, fontWeight: 900 }}>{integrity}%</span>
        </div>
        <div className="hud-item">
          <span>HPs:</span>
          <span className="hud-lives" style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`retro-icon-frame ${i < lives ? "red" : "gray"}`}
                style={{
                  width: 18,
                  height: 18,
                  opacity: i < lives ? 1 : 0.35,
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  borderRadius: 3,
                }}
              >
                <FavoriteRoundedIcon style={{ fontSize: 10, color: i < lives ? "#FFFFFF" : "#666666" }} />
              </span>
            ))}
          </span>
        </div>
        <div className="hud-item">
          <span>SCORE: <strong style={{ color: "#10B981" }}>{score}</strong></span>
        </div>
      </div>

      {/* Floating Action Toast Banner */}
      {toastMsg && (
        <div className="fullsite-retro-toast">
          <span className={`retro-icon-frame ${toastMsg.iconClass}`}>
            {toastMsg.icon}
          </span>
          <span>{toastMsg.msg}</span>
        </div>
      )}

      {/* Stage Clear Banner Popup */}
      {stageBanner && (
        <div className="fullsite-stage-banner">
          <div className="stage-banner-box">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className={`retro-icon-frame ${stageBanner.iconClass}`}>
                {stageBanner.icon}
              </span>
              <span className="stage-banner-title">{stageBanner.title}</span>
            </div>
            <div className="stage-banner-sub">{stageBanner.sub}</div>
          </div>
        </div>
      )}

      {/* Defeat Game Over Screen (3 Distinct Scenarios: Ship Destroyed / Timer Expired / Website Infected) */}
      {gameOver && (
        <div className="fullsite-game-overlay">
          <div className="game-result-box gameOver">
            <div className="result-header">
              <span className="retro-icon-frame coral">
                <WarningRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
              </span>
              <span>
                {gameOverReason === "lives"
                  ? "DEFENSE SHIP DESTROYED!"
                  : gameOverReason === "timer"
                  ? "STAGE TIMER EXPIRED!"
                  : "WEBSITE OVER-INFECTED!"}
              </span>
            </div>
            <p className="result-sub">
              {gameOverReason === "lives"
                ? `YOUR SHIP WAS ELIMINATED BY ENEMY LASERS! FINAL SCORE: ${score}`
                : gameOverReason === "timer"
                ? `TIME OUT! VIRUSES OVERRAN THE SECTOR! FINAL SCORE: ${score}`
                : `VIRUSES FULLY CORRUPTED THE PORTFOLIO! FINAL SCORE: ${score}`}
            </p>
            <div className="result-buttons">
              <button className="retro-game-btn red" onClick={restartGame}>
                RESTART DEFENSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Victory Game Clear Screen */}
      {gameWon && (
        <div className="fullsite-game-overlay">
          <div className="game-result-box gameWon">
            <div className="result-header">
              <span className="retro-icon-frame green">
                <EmojiEventsRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
              </span>
              <span>VICTORY! ALL 5 SECTORS CLEARED!</span>
            </div>
            <p className="result-sub">
              SRI SAKTHI'S PORTFOLIO IS FULLY SECURED! FINAL SCORE: <strong>{score}</strong>
            </p>
            <div className="result-buttons">
              <button className="retro-game-btn green" onClick={restartGame}>
                PLAY AGAIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Touch Controllers */}
      <div className="fullsite-retro-controls">
        <div className="retro-controls-left">
          <button
            className="retro-touch-btn left"
            onTouchStart={() => (gameStateRef.current.touchDir = -1)}
            onTouchEnd={() => (gameStateRef.current.touchDir = 0)}
            onMouseDown={() => (gameStateRef.current.touchDir = -1)}
            onMouseUp={() => (gameStateRef.current.touchDir = 0)}
          >
            ◄
          </button>

          <button
            className="retro-touch-btn right"
            onTouchStart={() => (gameStateRef.current.touchDir = 1)}
            onTouchEnd={() => (gameStateRef.current.touchDir = 0)}
            onMouseDown={() => (gameStateRef.current.touchDir = 1)}
            onMouseUp={() => (gameStateRef.current.touchDir = 0)}
          >
            ►
          </button>
        </div>

        <div className="retro-controls-right">
          <button className="retro-touch-btn fire" onClick={fireLaser}>
            <span className="retro-icon-frame coral" style={{ width: 18, height: 18, marginRight: 6 }}>
              <WhatshotRoundedIcon style={{ fontSize: 12, color: "#FFFFFF" }} />
            </span>
            <span>FIRE</span>
          </button>
        </div>
      </div>
    </>
  );
}
