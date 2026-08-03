// Singleton Shared Web Audio Context to avoid browser quota limits
let sharedAudioCtx = null;

const getAudioContext = () => {
  if (window.isGlobalMuted) return null;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch (e) {
    return null;
  }
};

// 1. Character Portal Exit & Gliding Sound
export const playCharacterSpawnSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 1.2);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.2);
  } catch (e) {}
};

// 2. Laser Bullet Fire Sound
export const playLaserSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {}
};

// 3. Enemy Destruction Explosion Sound
export const playEnemyExplodeSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.linearRampToValueAtTime(40, now + 0.22);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  } catch (e) {}
};

// 4. Player Hit / Damage Sound
export const playPlayerHitSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.3);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {}
};

// 5. Unique Booster Pickups:
// A) SHIELD 🛡️ (Firewall Shield - Rising Arpeggio Chime)
export const playShieldPickupSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.18, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.12);
    });
  } catch (e) {}
};

// B) TRIPLE ⚡ (Triple Laser - Rapid High Frequency Staccato Bleeps)
export const playTriplePickupSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [880, 1320, 1760].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.2, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.08);
    });
  } catch (e) {}
};

// C) EMP 💣 (EMP Nuke - Heavy Bass Blast)
export const playEmpPickupSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  } catch (e) {}
};

// D) FREEZE ⏳ (Time Freeze - Glissando Time Warp Sound)
export const playFreezePickupSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.4);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch (e) {}
};

// 5. Game Start / Intro Fanfare Jingle (Plays during 1.8s intro popup duration)
export const playGameStartJingle = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [
      { f: 523.25, t: 0.00, d: 0.15 }, // C5
      { f: 659.25, t: 0.15, d: 0.15 }, // E5
      { f: 783.99, t: 0.30, d: 0.15 }, // G5
      { f: 1046.50, t: 0.45, d: 0.25 }, // C6
      { f: 1318.51, t: 0.70, d: 0.45 }, // E6
    ];

    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(f, now + t);
      gain.gain.setValueAtTime(0.20, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + d);
    });
  } catch (e) {}
};

// 6. Stage Clear Jingle (Plays for popup duration ~1.8s on level 1, 2, 3, 4 complete)
export const playStageClearJingle = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [
      { f: 783.99, t: 0.00, d: 0.12 }, // G5
      { f: 1046.50, t: 0.12, d: 0.12 }, // C6
      { f: 1318.51, t: 0.24, d: 0.15 }, // E6
      { f: 1567.98, t: 0.40, d: 0.40 }, // G6
    ];

    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, now + t);
      gain.gain.setValueAtTime(0.22, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + d);
    });
  } catch (e) {}
};

// 7. Full Game Victory Fanfare Theme (When all 5 stages are cleared)
export const playGameVictorySound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [
      { f: 523.25, t: 0.00, d: 0.15 },
      { f: 659.25, t: 0.15, d: 0.15 },
      { f: 783.99, t: 0.30, d: 0.15 },
      { f: 1046.50, t: 0.45, d: 0.20 },
      { f: 880.00, t: 0.65, d: 0.15 },
      { f: 1046.50, t: 0.80, d: 0.60 },
    ];

    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(f, now + t);
      gain.gain.setValueAtTime(0.24, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + d);
    });
  } catch (e) {}
};

// 8A. Defeat Sound #1: Ship Destroyed (0 HP / 0 Lives - Explosion breakdown crash)
export const playShipDestroyedDefeatSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [
      { f: 440.00, t: 0.00, d: 0.20 },
      { f: 349.23, t: 0.20, d: 0.20 },
      { f: 293.66, t: 0.40, d: 0.20 },
      { f: 220.00, t: 0.60, d: 0.50 },
    ];

    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(f, now + t);
      gain.gain.setValueAtTime(0.25, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + d);
    });
  } catch (e) {}
};

// 8B. Defeat Sound #2: Stage Timer Expired (Time Out - Frantic alarm buzzer crash)
export const playTimerExpiredDefeatSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [
      { f: 880.00, t: 0.00, d: 0.10 },
      { f: 880.00, t: 0.12, d: 0.10 },
      { f: 587.33, t: 0.25, d: 0.10 },
      { f: 587.33, t: 0.37, d: 0.10 },
      { f: 293.66, t: 0.50, d: 0.40 },
    ];

    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(f, now + t);
      gain.gain.setValueAtTime(0.22, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + d);
    });
  } catch (e) {}
};

// 8C. Defeat Sound #3: Website Over-Infected (0% Integrity - Cyber virus glitch meltdown)
export const playWebsiteInfectedDefeatSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [
      { f: 493.88, t: 0.00, d: 0.15 },
      { f: 392.00, t: 0.15, d: 0.15 },
      { f: 311.13, t: 0.30, d: 0.15 },
      { f: 246.94, t: 0.45, d: 0.15 },
      { f: 164.81, t: 0.60, d: 0.50 },
    ];

    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(f, now + t);
      gain.gain.setValueAtTime(0.24, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + d);
    });
  } catch (e) {}
};

// 6. High-Energy Action Retro Game Battle Song WAV Generator
export function createRetroBattleSongWavUrl() {
  try {
    const sampleRate = 11025;
    const bpm = 138; // Fast action battle tempo!
    const secPerBeat = 60 / bpm;
    
    // High Energy 8-Bit Battle Melody Notes
    const melody = [
      { note: 440.00, dur: 0.25 }, { note: 440.00, dur: 0.25 }, { note: 523.25, dur: 0.25 }, { note: 659.25, dur: 0.25 },
      { note: 587.33, dur: 0.25 }, { note: 523.25, dur: 0.25 }, { note: 440.00, dur: 0.50 },
      { note: 392.00, dur: 0.25 }, { note: 392.00, dur: 0.25 }, { note: 493.88, dur: 0.25 }, { note: 587.33, dur: 0.25 },
      { note: 523.25, dur: 0.25 }, { note: 493.88, dur: 0.25 }, { note: 392.00, dur: 0.50 },
      { note: 349.23, dur: 0.25 }, { note: 440.00, dur: 0.25 }, { note: 523.25, dur: 0.25 }, { note: 698.46, dur: 0.25 },
      { note: 659.25, dur: 0.25 }, { note: 523.25, dur: 0.25 }, { note: 440.00, dur: 0.50 },
      { note: 329.63, dur: 0.25 }, { note: 392.00, dur: 0.25 }, { note: 493.88, dur: 0.25 }, { note: 659.25, dur: 0.25 },
      { note: 880.00, dur: 0.50 }, { note: 659.25, dur: 0.50 },
    ];

    let samples = [];

    // Loop battle song 4 times
    for (let loop = 0; loop < 4; loop++) {
      melody.forEach(({ note, dur }) => {
        const numSamples = Math.floor(dur * secPerBeat * sampleRate);
        const freq = note;
        const period = sampleRate / freq;
        for (let i = 0; i < numSamples; i++) {
          const phase = (i % period) / period;
          const square = phase < 0.5 ? 1 : -1;
          const bassFreq = freq / 2;
          const bassPeriod = sampleRate / bassFreq;
          const bassPhase = (i % bassPeriod) / bassPeriod;
          const bassSquare = bassPhase < 0.5 ? 0.6 : -0.6;
          
          const envelope = Math.max(0, 1 - (i / numSamples) * 0.4);
          const val = Math.floor(128 + (square * 22 + bassSquare * 14) * envelope);
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
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate, true);
    view.setUint16(32, 1, true);
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
