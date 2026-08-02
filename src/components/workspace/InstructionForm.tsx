"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onend: (() => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  }

  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    length: number;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    length: number;
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
  }

  interface SpeechRecognitionAlternative {
    transcript: string;
  }

  interface SpeechRecognitionErrorEvent {
    error: string;
  }
}

type InstructionFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
};

export function InstructionForm({ value, onChange, onSubmit, loading }: InstructionFormProps) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  useEffect(() => {
    setVoiceSupported(Boolean(window.webkitSpeechRecognition));
  }, []);

  const handleStartListening = () => {
    if (!window.webkitSpeechRecognition) {
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "gu-IN";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }, (_, index) => event.results[index][0]?.transcript ?? "")
        .join(" ")
        .trim();
      onChange(transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const handleStopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="card-surface p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--sage)]">
            Instruction Capture
          </p>
          <h2 className="section-title mt-2 text-2xl">Paste text or use the browser mic</h2>
        </div>
        {voiceSupported ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            animate={isListening ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={isListening ? { repeat: Number.POSITIVE_INFINITY, duration: 1.2 } : undefined}
            onClick={isListening ? handleStopListening : handleStartListening}
            className={`btn-primary min-w-40 px-4 py-3 text-sm ${isListening ? "bg-[var(--warn)] hover:bg-[var(--warn)]" : ""}`}
          >
            {isListening ? "Stop Recording" : "Tap to Speak"}
          </motion.button>
        ) : (
          <span className="rounded-full bg-[rgba(154,52,18,0.08)] px-4 py-2 text-sm text-[var(--warn)]">
            Web Speech API not available in this browser
          </span>
        )}
      </div>

      <textarea
        className="field min-h-40 resize-y"
        placeholder="ભાવિનભાઈ ને આજથી 2 લિટર ભેંસનું દૂધ ચાલુ કર્યુ..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--muted)]">
          Gujarati and Gujlish both work. Mic capture fills the same input box.
        </p>
        <button type="submit" className="btn-primary px-5 py-3 text-sm" disabled={loading}>
          {loading ? "Extracting..." : "Extract Instruction"}
        </button>
      </div>
    </form>
  );
}
