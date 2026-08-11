let lastPlayTime = 0;

// Funny 8-bit retro arcade click/blip sound effect for interactive buttons
export const playFunnyClickSound = () => {
  if (window.isGlobalMuted) return;
  const nowMs = Date.now();
  if (nowMs - lastPlayTime < 50) return; // Prevent double-triggering
  lastPlayTime = nowMs;

  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const now = ctx.currentTime;
    osc.type = "sine";
    // Playful funny pitch slide: 600Hz -> 1200Hz -> 450Hz
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.035);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.07);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  } catch (e) {
    // Ignore audio errors silently
  }
};
