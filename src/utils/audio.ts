// Audio Synthesizer for MMA Boxing Timer & Drill Cues using Web Audio API

class SoundEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Boxing Gym Bell (resounding brass chime)
  playRoundBell() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const frequencies = [800, 1600, 2400, 3200];
      const gains = [0.6, 0.3, 0.15, 0.08];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(gains[idx], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.8);
      });
    } catch {
      // Audio not permitted yet
    }
  }

  // 10-second Warning Clacker (wooden block strike)
  playWarningClacker() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const strikes = [0, 0.15, 0.3];
      strikes.forEach((offset) => {
        const now = ctx.currentTime + offset;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(950, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.09);
      });
    } catch {
      // Audio muted
    }
  }

  // Metronome Beep for footwork cadence
  playTick(high = false) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(high ? 880 : 440, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio muted
    }
  }

  // MMA Octagon Air Horn
  playTitleFightHorn() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const hornFreqs = [220, 277.18, 329.63, 440];
      hornFreqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
      });
    } catch {
      // Audio muted
    }
  }

  // Double bell strike
  playDoubleBell() {
    this.playRoundBell();
    setTimeout(() => {
      this.playRoundBell();
    }, 280);
  }

  // Corner Coach Voice Callout using Web Speech API
  speakCoachCallout(phrase: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      this.playTick(true);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = 1.15;
      utterance.pitch = 0.95;
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch {
      this.playTick(true);
    }
  }
}

export const sound = new SoundEngine();
