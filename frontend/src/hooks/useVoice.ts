import { useState, useEffect, useCallback, useRef } from 'react';

export function useVoice() {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [audioFrequencies, setAudioFrequencies] = useState<number[]>([15, 30, 45, 25, 60, 40, 20]);
  const animationFrameRef = useRef<number | null>(null);

  // Generate dynamic frequency waves when listening or speaking
  useEffect(() => {
    if (isListening || isSpeaking) {
      const updateFrequencies = () => {
        const bars = 8;
        const newFreqs = Array.from({ length: bars }, () => {
          return Math.floor(Math.random() * (isSpeaking ? 85 : 55)) + 15;
        });
        setAudioFrequencies(newFreqs);
        animationFrameRef.current = requestAnimationFrame(updateFrequencies);
      };

      animationFrameRef.current = requestAnimationFrame(updateFrequencies);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setAudioFrequencies([12, 20, 15, 24, 18, 22, 14, 10]);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isListening, isSpeaking]);

  const startListening = useCallback(() => {
    setIsListening(true);
    setIsSpeaking(false);
    setTranscript('');
    
    // Simulate user speech transcription preview after a brief delay
    const demoPhrases = [
      "Can you summarize today's scheduled tasks?",
      "Help me debug an async React state issue.",
      "Explain quantum computing fundamentals.",
      "Show me recent conversation history."
    ];
    const pickedPhrase = demoPhrases[Math.floor(Math.random() * demoPhrases.length)];
    
    setTimeout(() => {
      setTranscript(pickedPhrase);
    }, 1800);
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  const simulateSpeech = useCallback((text?: string, durationMs: number = 3200) => {
    setIsSpeaking(true);
    setIsListening(false);
    
    // Optional Web Speech API fallback if available in browser
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && text) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        return;
      } catch (e) {
        console.warn('Speech synthesis not permitted in current frame:', e);
      }
    }

    const timer = setTimeout(() => {
      setIsSpeaking(false);
    }, durationMs);

    return () => clearTimeout(timer);
  }, []);

  const stopSpeaking = useCallback(() => {
    setIsSpeaking(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }
  }, []);

  return {
    isListening,
    isSpeaking,
    transcript,
    audioFrequencies,
    startListening,
    stopListening,
    simulateSpeech,
    stopSpeaking,
    setTranscript,
  };
}
