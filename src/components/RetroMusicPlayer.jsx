import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import { playFunnyClickSound } from "../utils/soundEffects";
import "../styles/RetroMusicPlayer.css";

// 5 Peaceful 30-Second Retro Game Songs
const PLAYLIST = [
  {
    name: "TREES",
    bpm: 80,
    duration: 30,
    notes: [
      { note: 261.63, dur: 0.5 }, { note: 329.63, dur: 0.5 }, { note: 392.00, dur: 0.5 }, { note: 493.88, dur: 1.0 },
      { note: 349.23, dur: 0.5 }, { note: 440.00, dur: 0.5 }, { note: 523.25, dur: 0.5 }, { note: 659.25, dur: 1.0 },
      { note: 392.00, dur: 0.5 }, { note: 493.88, dur: 0.5 }, { note: 587.33, dur: 0.5 }, { note: 783.99, dur: 1.0 },
      { note: 261.63, dur: 0.5 }, { note: 392.00, dur: 0.5 }, { note: 523.25, dur: 1.0 },
    ],
  },
  {
    name: "STARDUST",
    bpm: 72,
    duration: 30,
    notes: [
      { note: 392.00, dur: 0.75 }, { note: 493.88, dur: 0.75 }, { note: 587.33, dur: 0.75 }, { note: 783.99, dur: 1.25 },
      { note: 329.63, dur: 0.75 }, { note: 440.00, dur: 0.75 }, { note: 523.25, dur: 0.75 }, { note: 659.25, dur: 1.25 },
      { note: 293.66, dur: 0.75 }, { note: 369.99, dur: 0.75 }, { note: 440.00, dur: 0.75 }, { note: 587.33, dur: 1.25 },
      { note: 261.63, dur: 0.75 }, { note: 329.63, dur: 0.75 }, { note: 392.00, dur: 1.5 },
    ],
  },
  {
    name: "DREAMING",
    bpm: 76,
    duration: 30,
    notes: [
      { note: 440.00, dur: 0.6 }, { note: 523.25, dur: 0.6 }, { note: 659.25, dur: 0.6 }, { note: 880.00, dur: 1.2 },
      { note: 349.23, dur: 0.6 }, { note: 440.00, dur: 0.6 }, { note: 523.25, dur: 0.6 }, { note: 698.46, dur: 1.2 },
      { note: 329.63, dur: 0.6 }, { note: 392.00, dur: 0.6 }, { note: 493.88, dur: 0.6 }, { note: 659.25, dur: 1.2 },
      { note: 293.66, dur: 0.6 }, { note: 349.23, dur: 0.6 }, { note: 440.00, dur: 1.4 },
    ],
  },
  {
    name: "CROSSROADS",
    bpm: 84,
    duration: 30,
    notes: [
      { note: 293.66, dur: 0.5 }, { note: 369.99, dur: 0.5 }, { note: 440.00, dur: 0.5 }, { note: 587.33, dur: 1.0 },
      { note: 246.94, dur: 0.5 }, { note: 311.13, dur: 0.5 }, { note: 369.99, dur: 0.5 }, { note: 493.88, dur: 1.0 },
      { note: 220.00, dur: 0.5 }, { note: 277.18, dur: 0.5 }, { note: 329.63, dur: 0.5 }, { note: 440.00, dur: 1.0 },
      { note: 293.66, dur: 0.5 }, { note: 440.00, dur: 0.5 }, { note: 587.33, dur: 1.0 },
    ],
  },
  {
    name: "MOONLIGHT",
    bpm: 68,
    duration: 30,
    notes: [
      { note: 329.63, dur: 0.8 }, { note: 415.30, dur: 0.8 }, { note: 493.88, dur: 0.8 }, { note: 659.25, dur: 1.6 },
      { note: 277.18, dur: 0.8 }, { note: 349.23, dur: 0.8 }, { note: 415.30, dur: 0.8 }, { note: 554.37, dur: 1.6 },
      { note: 220.00, dur: 0.8 }, { note: 277.18, dur: 0.8 }, { note: 329.63, dur: 0.8 }, { note: 440.00, dur: 1.6 },
      { note: 329.63, dur: 0.8 }, { note: 493.88, dur: 0.8 }, { note: 659.25, dur: 1.6 },
    ],
  },
];

// Generate real 8-bit PCM WAV Blob URL for instant HTML5 media autoplay on site load
function createWavBlobUrl(notes, bpm) {
  try {
    const sampleRate = 11025;
    const numChannels = 1;
    const bytesPerSample = 1;
    const secPerBeat = 60 / bpm;
    let samples = [];

    for (let loop = 0; loop < 3; loop++) {
      notes.forEach(({ note, dur }) => {
        const numSamples = Math.floor(dur * secPerBeat * sampleRate);
        const freq = note;
        const period = sampleRate / freq;
        for (let i = 0; i < numSamples; i++) {
          const phase = (i % period) / period;
          const tri = phase < 0.5 ? 4 * phase - 1 : 3 - 4 * phase;
          const envelope = Math.max(0, 1 - (i / numSamples) * 0.75);
          const val = Math.floor(128 + tri * 28 * envelope);
          samples.push(val);
        }
      });
    }

    const dataSize = samples.length;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    function writeString(offset, str) {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    }

    writeString(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * bytesPerSample, true);
    view.setUint16(32, numChannels * bytesPerSample, true);
    view.setUint16(34, 8, true);
    writeString(36, "data");
    view.setUint32(40, dataSize, true);

    for (let i = 0; i < dataSize; i++) {
      view.setUint8(44 + i, samples[i]);
    }

    const blob = new Blob([buffer], { type: "audio/wav" });
    return URL.createObjectURL(blob);
  } catch (e) {
    return "";
  }
}

const RetroMusicPlayer = ({
  isLoading,
  gameActive,
  onMusicStateChange,
  isPlayingProp,
  setIsPlayingProp,
  isMutedProp,
  setIsMutedProp,
  volumeProp,
  setVolumeProp,
  currentTrackIdxProp,
  setCurrentTrackIdxProp,
}) => {
  const [internalTrackIdx, setInternalTrackIdx] = useState(0);
  const [internalPlaying, setInternalPlaying] = useState(true);
  const [internalMuted, setInternalMuted] = useState(false);
  const [internalVolume, setInternalVolume] = useState(0.4);

  const currentTrackIdx = currentTrackIdxProp !== undefined ? currentTrackIdxProp : internalTrackIdx;
  const setCurrentTrackIdx = setCurrentTrackIdxProp || setInternalTrackIdx;

  const isPlaying = isPlayingProp !== undefined ? isPlayingProp : internalPlaying;
  const setIsPlaying = setIsPlayingProp || setInternalPlaying;

  const isMuted = isMutedProp !== undefined ? isMutedProp : internalMuted;
  const setIsMuted = setIsMutedProp || setInternalMuted;

  const volume = volumeProp !== undefined ? volumeProp : internalVolume;
  const setVolume = setVolumeProp || setInternalVolume;

  const [showControls, setShowControls] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");
  const [needUserInteraction, setNeedUserInteraction] = useState(false);

  const playerRef = useRef(null);
  const audioRef = useRef(null);
  const currentTrack = PLAYLIST[currentTrackIdx];

  // Notify parent of music play/pause/mute state changes & set global mute flag
  useEffect(() => {
    window.isGlobalMuted = isMuted;
    if (onMusicStateChange) {
      onMusicStateChange({ isPlaying, isMuted, volume });
    }
  }, [isPlaying, isMuted, volume, onMusicStateChange]);

  // Generate WAV blob for current track
  useEffect(() => {
    const url = createWavBlobUrl(currentTrack.notes, currentTrack.bpm);
    setAudioSrc(url);
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [currentTrackIdx]);

  // Immediately & forcefully pause & mute website background audio whenever Game Mode is active
  useEffect(() => {
    window.isGameActive = gameActive;
    if (gameActive && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.muted = true;
    }
  }, [gameActive]);

  // Keep a ref of latest state to avoid stale closures in gesture callbacks
  const stateRef = useRef({ isPlaying, isMuted, volume, gameActive, isLoading });
  useEffect(() => {
    stateRef.current = { isPlaying, isMuted, volume, gameActive, isLoading };
  }, [isPlaying, isMuted, volume, gameActive, isLoading]);

  // Sync HTML5 Audio element play/pause state & auto-resume on reload/gestures
  useEffect(() => {
    window.isGameActive = gameActive;
    if (gameActive || window.isGameActive) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.muted = true;
      }
      return;
    }

    if (audioRef.current && !gameActive && !window.isGameActive) {
      audioRef.current.muted = isMuted;
    }

    const attemptPlay = () => {
      if (audioRef.current) {
        if (gameActive || window.isGameActive || !isPlaying || isMuted || document.hidden || isLoading) {
          audioRef.current.pause();
        } else {
          audioRef.current.volume = isMuted ? 0 : volume;
          audioRef.current.muted = isMuted;
          const promise = audioRef.current.play();
          if (promise !== undefined) {
            promise
              .then(() => setNeedUserInteraction(false))
              .catch(() => {
                setNeedUserInteraction(true);
                const handleGesture = () => {
                  setNeedUserInteraction(false);
                  const st = stateRef.current;
                  if (audioRef.current && st.isPlaying && !st.isMuted && !st.gameActive && !window.isGameActive && !document.hidden && !st.isLoading) {
                    audioRef.current.play().catch(() => {});
                  }
                };
                ["pointerdown", "keydown", "click", "resume-bgm-audio"].forEach((evt) => {
                  window.addEventListener(evt, handleGesture, { once: true });
                  document.addEventListener(evt, handleGesture, { once: true });
                });
              });
          }
        }
      }
    };

    attemptPlay();

    const handleCustomResume = () => {
      if (!gameActive && !window.isGameActive) attemptPlay();
    };
    window.addEventListener("resume-bgm-audio", handleCustomResume);
    return () => {
      window.removeEventListener("resume-bgm-audio", handleCustomResume);
    };
  }, [isPlaying, isMuted, volume, gameActive, isLoading, audioSrc]);

  // Tab visibility auto-pause
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (audioRef.current) {
        if (!isPlaying || isMuted || gameActive || document.hidden || isLoading) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(() => {});
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying, isMuted, gameActive, isLoading]);

  const handleAudioEnded = () => {
    setCurrentTrackIdx((prev) => (prev + 1) % PLAYLIST.length);
  };

  // Toggle Play / Pause directly
  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    playFunnyClickSound();
    setIsPlaying((prev) => {
      const nextState = !prev;
      if (nextState && isMuted) {
        setIsMuted(false);
      }
      return nextState;
    });
  };

  const [mobileExpanded, setMobileExpanded] = useState(false);
  const clickTimeoutRef = useRef(null);

  // When muted: Single click immediately unmutes & resumes playing!
  // When unmuted: Single click = Play/Pause | Double click = Mute!
  const handleBadgeClick = (e) => {
    if (e) e.stopPropagation();

    // 1. If MUTED: Immediately unmute & play on the very first click!
    if (isMuted) {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
      playFunnyClickSound();
      setIsMuted(false);
      setIsPlaying(true);
      return;
    }

    // 2. If DOUBLE-CLICK detected while unmuted -> Mute!
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;

      playFunnyClickSound();
      setIsMuted(true);
      return;
    }

    // 3. SINGLE CLICK TIMER (200ms delay to check for double-click mute)
    clickTimeoutRef.current = setTimeout(() => {
      clickTimeoutRef.current = null;

      playFunnyClickSound();
      if (window.innerWidth <= 991) {
        setMobileExpanded((prev) => !prev);
        setShowControls((prev) => !prev);
      }
      setIsPlaying((prev) => !prev);
    }, 200);
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    playFunnyClickSound();
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    if (e) e.stopPropagation();
    setVolume(parseFloat(e.target.value));
  };

  const handleNextTrack = (e) => {
    if (e) e.stopPropagation();
    playFunnyClickSound();
    setCurrentTrackIdx((prev) => (prev + 1) % PLAYLIST.length);
  };

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (playerRef.current && !playerRef.current.contains(e.target)) {
        setShowControls(false);
        setMobileExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={playerRef}
      className="omori-music-player-wrapper"
      onMouseEnter={() => {
        if (window.innerWidth > 991) setShowControls(true);
      }}
      onMouseLeave={() => {
        if (window.innerWidth > 991) setShowControls(false);
      }}
    >
      {/* Real HTML5 Audio Element with WAV Blob (Plays ONLY when loading screen completes!) */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          autoPlay={!isLoading}
          onEnded={handleAudioEnded}
        />
      )}

      {/* Top Right Corner Badge (Single click = Play/Pause | Double click = Mute/Unmute) */}
      <button
        className={`omori-music-badge-btn ${isMuted ? "muted" : ""} ${mobileExpanded ? "mobile-expanded" : ""}`}
        onClick={handleBadgeClick}
        title={isMuted ? "Single Click: Play/Pause | Double Click: Unmute" : "Single Click: Play/Pause | Double Click: Mute"}
      >
        <span className="music-note-icon">
          ♪
          {isMuted && <span className="red-slash" />}
        </span>
        <span className="music-track-title">{gameActive ? "RETRO BATTLE" : currentTrack.name}</span>
        {isPlaying && !isMuted ? (
          <span className="music-live-indicator" title="Playing" />
        ) : (
          <span className="music-paused-indicator" title="Paused" />
        )}
      </button>

      {/* Floating Controls Overlay */}
      {showControls && (
        <div className="omori-music-controls-popover">
          <div className="music-popover-header">
            <span className="music-popover-title">{gameActive ? "ACTION RETRO BATTLE" : "RETRO SOUNDTRACK"}</span>
            <span className="music-popover-status">
              {isMuted ? "MUTED" : isPlaying ? "NOW PLAYING" : "PAUSED"}
            </span>
          </div>

          <div className="music-popover-actions">
            <button className="music-ctrl-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? (
                <PauseRoundedIcon style={{ fontSize: 14 }} />
              ) : (
                <PlayArrowRoundedIcon style={{ fontSize: 14 }} />
              )}
            </button>

            <button className="music-ctrl-btn" onClick={handleNextTrack} title="Next Song">
              <SkipNextRoundedIcon style={{ fontSize: 14 }} />
            </button>

            <button className="music-ctrl-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? (
                <VolumeOffRoundedIcon style={{ fontSize: 14 }} />
              ) : (
                <VolumeUpRoundedIcon style={{ fontSize: 14 }} />
              )}
            </button>
          </div>

          {/* Volume Slider */}
          <div className="music-volume-row">
            <span className="volume-label">VOL</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="omori-volume-slider"
            />
          </div>
        </div>
      )}

      {/* Floating Autoplay Hint Notification Toast (Appears when browser blocks autoplay until first click) */}
      {needUserInteraction && !isMuted && isPlaying && !gameActive && createPortal(
        <div
          className="audio-autoplay-hint-toast"
          onClick={(e) => {
            e.stopPropagation();
            if (audioRef.current) {
              audioRef.current
                .play()
                .then(() => setNeedUserInteraction(false))
                .catch(() => {});
            }
          }}
        >
          <span className="pulse-dot" />
          <span className="desktop-only-text">CLICK ANYWHERE TO ACTIVATE RETRO AUDIO</span>
          <span className="mobile-only-text">PLAY MUSIC 🔊</span>
        </div>,
        document.body
      )}
    </div>
  );
};

export default RetroMusicPlayer;
