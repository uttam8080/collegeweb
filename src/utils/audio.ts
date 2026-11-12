// Meditative Indian classical ambient tone generator using Web Audio API

class MeditativeAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private activeOscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  // Plays a rich Sa-Pa (Tonic and Fifth) Indian Tanpura drone chord
  public playDrone(durationSec: number = 8, onEnded?: () => void) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.stop();
      this.isPlaying = true;

      const now = this.ctx.currentTime;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, now);
      this.gainNode.gain.linearRampToValueAtTime(0.12, now + 1.2);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);
      this.gainNode.connect(this.ctx.destination);

      // Frequencies corresponding to Sa (C#3 ~ 138.59 Hz), Pa (G#3 ~ 207.65 Hz), Sa higher octave (C#4 ~ 277.18 Hz)
      const frequencies = [138.59, 207.65, 277.18, 554.37];

      this.activeOscillators = frequencies.map((freq, index) => {
        const osc = this.ctx!.createOscillator();
        osc.type = index % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), now); // slight chorus detuning
        osc.connect(this.gainNode!);
        osc.start(now);
        osc.stop(now + durationSec);
        return osc;
      });

      setTimeout(() => {
        this.isPlaying = false;
        if (onEnded) onEnded();
      }, durationSec * 1000);
    } catch {
      this.isPlaying = false;
      if (onEnded) onEnded();
    }
  }

  // Play subtle chime on completing quiz / lesson
  public playChime() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const chimeGain = this.ctx.createGain();
      chimeGain.gain.setValueAtTime(0.001, now);
      chimeGain.gain.linearRampToValueAtTime(0.15, now + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
      chimeGain.connect(this.ctx.destination);

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 bell arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        osc.connect(chimeGain);
        osc.start(now + idx * 0.09);
        osc.stop(now + 2.0);
      });
    } catch {
      // Audio not permitted or supported
    }
  }

  public stop() {
    if (this.activeOscillators.length > 0) {
      this.activeOscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // already stopped
        }
      });
      this.activeOscillators = [];
    }
    this.isPlaying = false;
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const soundEngine = new MeditativeAudioEngine();
