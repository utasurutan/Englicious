// Web Speech API wrapper for Text-to-Speech with multi-accent support (US, UK, AU, CA)

export type SpeechAccent = 'US' | 'UK' | 'AU' | 'CA';

export interface VoiceOption {
  name: string;
  lang: string;
  accent: SpeechAccent;
  isNatural: boolean;
}

export class SpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static voices: SpeechSynthesisVoice[] = [];
  private static voicesLoaded = false;
  private static currentAccent: SpeechAccent = 'US';

  private static loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    this.voicesLoaded = true;
  }

  public static init() {
    if (typeof window === 'undefined' || !this.synth) return;
    this.loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices();
    }
  }

  public static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public static setDefaultAccent(accent: SpeechAccent) {
    this.currentAccent = accent;
  }

  public static getDefaultAccent(): SpeechAccent {
    return this.currentAccent;
  }

  public static getAvailableVoices(): VoiceOption[] {
    if (!this.synth) return [];
    if (this.voices.length === 0) {
      this.loadVoices();
    }

    return this.voices
      .filter(v => v.lang.startsWith('en'))
      .map(v => {
        let accent: SpeechAccent = 'US';
        if (v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('British')) accent = 'UK';
        else if (v.lang === 'en-AU' || v.name.includes('Australia')) accent = 'AU';
        else if (v.lang === 'en-CA' || v.name.includes('Canada')) accent = 'CA';

        const isNatural = v.name.includes('Natural') || 
                          v.name.includes('Google') || 
                          v.name.includes('Online') || 
                          v.name.includes('Neural') ||
                          v.name.includes('Samantha') || 
                          v.name.includes('Daniel');

        return {
          name: v.name,
          lang: v.lang,
          accent,
          isNatural
        };
      });
  }

  private static findBestVoiceForAccent(accent: SpeechAccent): SpeechSynthesisVoice | undefined {
    if (this.voices.length === 0 && this.synth) {
      this.voices = this.synth.getVoices();
    }

    const langCode = accent === 'UK' ? 'en-GB' 
                   : accent === 'AU' ? 'en-AU' 
                   : accent === 'CA' ? 'en-CA' 
                   : 'en-US';

    // 1. Try Natural/Online/Premium voice matching exact lang
    let match = this.voices.find(v => 
      v.lang === langCode && 
      (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Online') || v.name.includes('Google'))
    );

    // 2. Try known high quality system voices
    if (!match) {
      if (accent === 'UK') {
        match = this.voices.find(v => v.lang === 'en-GB' || v.name.includes('Daniel') || v.name.includes('Oliver') || v.name.includes('George'));
      } else if (accent === 'AU') {
        match = this.voices.find(v => v.lang === 'en-AU' || v.name.includes('Karen') || v.name.includes('Russell'));
      } else {
        match = this.voices.find(v => v.lang === 'en-US' || v.name.includes('Samantha') || v.name.includes('Alex') || v.name.includes('David'));
      }
    }

    // 3. Fallback to any voice with that langCode
    if (!match) {
      match = this.voices.find(v => v.lang === langCode);
    }

    // 4. Fallback to any English voice
    if (!match) {
      match = this.voices.find(v => v.lang.startsWith('en'));
    }

    return match;
  }

  public static speak(
    text: string, 
    rate: number = 1.0, 
    pitch: number = 1.0, 
    onEnd?: () => void,
    accent?: SpeechAccent
  ): boolean {
    if (typeof window === 'undefined' || !this.synth) {
      if (onEnd) onEnd();
      return false;
    }

    try {
      this.synth.cancel(); // Stop any currently playing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = Math.max(0.5, Math.min(2.0, rate));
      utterance.pitch = Math.max(0.5, Math.min(1.5, pitch));

      const targetAccent = accent || this.currentAccent;
      utterance.lang = targetAccent === 'UK' ? 'en-GB' 
                     : targetAccent === 'AU' ? 'en-AU' 
                     : targetAccent === 'CA' ? 'en-CA' 
                     : 'en-US';

      const voice = this.findBestVoiceForAccent(targetAccent);
      if (voice) {
        utterance.voice = voice;
      }

      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      }

      this.synth.speak(utterance);
      return true;
    } catch {
      if (onEnd) onEnd();
      return false;
    }
  }

  public static speakWithAccent(
    text: string, 
    accent: SpeechAccent = 'US', 
    rate: number = 1.0, 
    onEnd?: () => void
  ): boolean {
    return this.speak(text, rate, 1.0, onEnd, accent);
  }

  public static pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public static resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public static stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}
