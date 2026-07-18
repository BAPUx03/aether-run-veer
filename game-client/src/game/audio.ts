export class SynthAudio {
  private context?: AudioContext;
  private musicTimer?: number;
  private musicStep = 0;
  private musicWorld = -1;
  muted = false;

  unlock(): void {
    if (!this.context) this.context = new AudioContext();
    if (this.context.state === 'suspended') void this.context.resume();
  }

  setMuted(value: boolean): void { this.muted = value; }

  startMusic(world: number): void {
    if (this.musicWorld === world && this.musicTimer) return;
    this.stopMusic();
    this.musicWorld = world;
    const themes = [
      [220, 277, 330, 440, 330, 277, 247, 330],
      [165, 196, 247, 294, 247, 196, 185, 220],
      [196, 247, 294, 392, 330, 294, 247, 220],
      [174, 220, 261, 349, 261, 220, 196, 261],
      [196, 233, 294, 392, 349, 294, 233, 196],
      [174, 220, 261, 330, 392, 330, 261, 220],
      [146, 185, 220, 293, 233, 185, 164, 220],
    ];
    const notes = themes[Math.max(0, Math.min(themes.length - 1, world))];
    this.musicStep = 0;
    this.musicTimer = window.setInterval(() => {
      const note = notes[this.musicStep % notes.length];
      this.tone(note, .32, world === 6 ? 'sawtooth' : 'triangle', .012);
      if (this.musicStep % 2 === 0) this.tone(note / 2, .38, 'sine', .009);
      if (this.musicStep % 4 === 0) this.tone(72, .11, 'sine', .022, -18);
      this.musicStep++;
    }, world === 6 ? 330 : 390);
  }

  stopMusic(): void {
    if (this.musicTimer) window.clearInterval(this.musicTimer);
    this.musicTimer = undefined;
  }

  tone(freq: number, duration = 0.1, type: OscillatorType = 'sine', volume = 0.05, slide = 0): void {
    if (this.muted) return;
    this.unlock();
    const ctx = this.context;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), ctx.currentTime + duration);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  jump(): void { this.tone(260, .13, 'square', .035, 180); }
  gem(): void { this.tone(720, .08, 'sine', .045, 240); }
  shard(): void { [0, 90, 180].forEach((v, i) => setTimeout(() => this.tone(520 + v, .16, 'triangle', .05), i * 65)); }
  hurt(): void { this.tone(130, .22, 'sawtooth', .045, -70); }
  stomp(): void { this.tone(110, .08, 'square', .045, 40); }
  checkpoint(): void { [440, 554, 659].forEach((v, i) => setTimeout(() => this.tone(v, .18, 'sine', .045), i * 90)); }
  portal(): void { [330, 440, 660, 880].forEach((v, i) => setTimeout(() => this.tone(v, .25, 'triangle', .05), i * 100)); }
  dash(): void { this.tone(180, .12, 'sawtooth', .03, 420); }
  coin(): void { this.tone(840, .07, 'square', .025, 210); }
  bossHit(): void { this.tone(95, .24, 'sawtooth', .055, 110); }
}

export const audio = new SynthAudio();
