// Web Speech API wrapper for Text-to-Speech and Speech-to-Text

export class SpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static voices: SpeechSynthesisVoice[] = [];
  private static voicesLoaded = false;

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

  public static speak(
    text: string, 
    rate: number = 1.0, 
    pitch: number = 1.0, 
    onEnd?: () => void
  ): boolean {
    if (typeof window === 'undefined' || !this.synth) {
      if (onEnd) onEnd();
      return false;
    }

    try {
      this.synth.cancel(); // Stop any currently playing audio

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.lang = 'en-US';

      // Prefer a natural sounding English voice if available
      if (this.voices.length === 0) {
        this.voices = this.synth.getVoices();
      }

      const englishVoice = this.voices.find(v => 
        (v.lang === 'en-US' || v.lang === 'en-GB') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
      ) || this.voices.find(v => v.lang.startsWith('en'));

      if (englishVoice) {
        utterance.voice = englishVoice;
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

  public static stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

