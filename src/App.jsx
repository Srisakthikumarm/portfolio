import React, { useState, useEffect } from "react";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import AllProjects from "./components/AllProjects";
import Education from "./components/Education";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import SidebarNav from "./components/SidebarNav";
import FullSiteRetroGame from "./components/FullSiteRetroGame";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
export const HourglassIcon = ({ style }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" style={{ ...style }}>
    <path d="M 4 3 H 20" />
    <path d="M 4 21 H 20" />
    <path d="M 5 3 L 12 12 L 19 3 Z" fill="currentColor" fillOpacity="0.9" />
    <path d="M 5 21 L 12 12 L 19 21 Z" fill="currentColor" fillOpacity="0.9" />
  </svg>
);

export const BombIcon = ({ style }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" style={{ ...style }}>
    <circle cx="11" cy="14" r="7" />
    <path d="M14 8L17 5M17 5C17.5 4.5 19 4 19.5 4.5C20 5 19.5 6.5 19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <circle cx="19.5" cy="4.5" r="1.2" />
  </svg>
);
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { playFunnyClickSound } from "./utils/soundEffects";
import "./App.css";
import "./styles/Global.css";
import "./styles/FullSiteRetroGame.css";

function App() {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const [gameActive, setGameActive] = useState(false);
  const [showGameInfo, setShowGameInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [musicState, setMusicState] = useState({ isPlaying: true, isMuted: false, volume: 0.4 });

  // Always redirect to Home / Main Page on mount (page refresh) only once on initial load
  useEffect(() => {
    if (!window.hasRedirectedOnLoad) {
      window.hasRedirectedOnLoad = true;
      if (window.location.pathname !== "/" && window.location.pathname !== "") {
        navigate("/");
      } else if (window.location.hash) {
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  // Global gesture listener to resume audio immediately on first interaction after F5 / browser reload
  useEffect(() => {
    const handleGesture = () => {
      window.dispatchEvent(new Event("resume-bgm-audio"));
    };
    window.addEventListener("pointerdown", handleGesture, { once: true });
    window.addEventListener("keydown", handleGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      window.dispatchEvent(new Event("resume-bgm-audio"));
    }, 50);
  };

  const handleToggleGame = () => {
    playFunnyClickSound();
    setGameActive((a) => !a);
  };

  const handleToggleInfo = () => {
    playFunnyClickSound();
    setShowGameInfo((v) => !v);
  };

  return (
    <div className="App">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <NavBar isLoading={isLoading} gameActive={gameActive} onMusicStateChange={setMusicState} />
      {!isLoading && (
        <>
          <div className="game-toggle-fixed">
            <div className="game-toggle-row">
              <button
                className={`game-toggle-btn${gameActive ? " game-toggle-btn--on" : ""}`}
                onClick={handleToggleGame}
                title={gameActive ? "Disable game mode" : "Enable game mode"}
              >
                <span className="game-toggle-dot" />
                GAME MODE
              </button>
              <div
                className="game-info-btn-wrap"
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setShowGameInfo(true)}
                onMouseLeave={() => window.matchMedia('(hover: hover)').matches && setShowGameInfo(false)}
              >
                <button
                  className="game-info-btn"
                  onClick={handleToggleInfo}
                  title="How to play"
                >
                  i
                </button>
                {showGameInfo && (
                  <div className="robot-game-info">
                    <div className="robot-game-info-title">
                      <span className="retro-icon-frame blue" style={{ width: 18, height: 18, fontSize: 8, marginRight: 6 }}>
                        <ShieldRoundedIcon style={{ fontSize: 11, color: "#FFFFFF" }} />
                      </span>
                      CYBER DEFENSE
                    </div>

                    <div className="robot-game-info-row desktop-only">
                      <span className="robot-game-key">A / D</span>
                      <span>Move Ship</span>
                    </div>

                    <div className="robot-game-info-row desktop-only">
                      <span className="robot-game-key">Space / Click</span>
                      <span>Fire Laser</span>
                    </div>

                    <div className="robot-game-info-row mobile-only">
                      <span className="robot-game-key">◄ / ►</span>
                      <span>Move Ship</span>
                    </div>

                    <div className="robot-game-info-row mobile-only">
                      <span className="robot-game-key boosters-combined-pill">
                        <span className="retro-icon-frame coral" style={{ width: 18, height: 18, marginRight: 0 }}>
                          <WhatshotRoundedIcon style={{ fontSize: 11, color: "#FFFFFF" }} />
                        </span>
                        <span>FIRE</span>
                      </span>
                      <span>Fire Laser</span>
                    </div>

                    <div className="robot-game-info-row">
                      <span className="robot-game-key boosters-combined-pill">
                        <span className="retro-icon-frame blue" style={{ width: 18, height: 18, marginRight: 0 }}>
                          <ShieldRoundedIcon style={{ fontSize: 11, color: "#FFFFFF" }} />
                        </span>
                        <span className="retro-icon-frame purple" style={{ width: 18, height: 18, marginRight: 0 }}>
                          <BoltRoundedIcon style={{ fontSize: 11, color: "#FFFFFF" }} />
                        </span>
                        <span className="retro-icon-frame coral" style={{ width: 18, height: 18, marginRight: 0 }}>
                          <BombIcon style={{ fontSize: 11, color: "#FFFFFF" }} />
                        </span>
                        <span className="retro-icon-frame amber" style={{ width: 18, height: 18, marginRight: 0 }}>
                          <HourglassIcon style={{ fontSize: 11, color: "#FFFFFF" }} />
                        </span>
                      </span>
                      <span style={{ textAlign: "right" }}>Collect Boosters</span>
                    </div>

                    <div className="robot-game-info-divider" />

                    <div className="robot-game-info-desc">
                      Destroy invading viruses across 5 sectors to protect Sri Sakthi's portfolio from corruption & fading!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <SidebarNav />
          <FullSiteRetroGame active={gameActive} musicState={musicState} />
          <div id="content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Intro />
                    <About />
                    <Experience />
                    <Projects />
                    <Education />
                    <Contact />
                    <Credits />
                  </>
                }
              />
              <Route
                path="/projects"
                element={
                  <>
                    <AllProjects />
                    <Credits />
                  </>
                }
              />
              <Route
                path="/all-projects"
                element={
                  <>
                    <AllProjects />
                    <Credits />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <Intro />
                    <About />
                    <Experience />
                    <Projects />
                    <Education />
                    <Contact />
                    <Credits />
                  </>
                }
              />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
