import React, { useState, useEffect } from "react";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import SidebarNav from "./components/SidebarNav";
import FullSiteRetroGame from "./components/FullSiteRetroGame";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "./styles/Global.css";
import "./styles/FullSiteRetroGame.css";

function App() {
  const { pathname } = useLocation();
  const [gameActive, setGameActive] = useState(false);
  const [showGameInfo, setShowGameInfo] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <NavBar />
      <div className="game-toggle-fixed">
        <div className="game-toggle-row">
          <button
            className={`game-toggle-btn${gameActive ? " game-toggle-btn--on" : ""}`}
            onClick={() => setGameActive((a) => !a)}
            title={gameActive ? "Disable game mode" : "Enable game mode"}
          >
            <span className="game-toggle-dot" />
            GAME MODE
          </button>
          <button
            className="game-info-btn"
            onMouseEnter={() => setShowGameInfo(true)}
            onMouseLeave={() => setShowGameInfo(false)}
            onClick={() => setShowGameInfo((prev) => !prev)}
            title="Game Controls Info"
          >
            i
          </button>
        </div>
        {showGameInfo && (
          <div className="robot-game-info">
            <div className="robot-game-info-title">🛡️ CYBER DEFENSE</div>
            <div className="robot-game-info-row">
              <span className="robot-game-key">A / D</span>
              <span>Move Ship</span>
            </div>
            <div className="robot-game-info-row">
              <span className="robot-game-key">Space / Click</span>
              <span>Fire Laser</span>
            </div>
            <div className="robot-game-info-row">
              <span className="robot-game-key">🛡️ ⚡ 💣 ⏳</span>
              <span>Collect Boosters</span>
            </div>
            <div className="robot-game-info-goal">
              Destroy invading viruses across 5 sectors to protect Sri Sakthi's portfolio from corruption & fading!
            </div>
          </div>
        )}
      </div>
      <SidebarNav />
      <FullSiteRetroGame active={gameActive} />
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
                <Credits />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
