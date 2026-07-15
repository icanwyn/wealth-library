/**
 * Wealth 財 — Natural text-to-speech reader
 * Uses the Web Speech API with the best available system voices.
 * No API keys; works offline once voices are loaded (browser-dependent).
 */
(function (global) {
  "use strict";

  const PREFERRED_VOICE_PATTERNS = [
    // Higher-quality / neural-ish system voices first
    /samantha/i,
    /karen/i,
    /moira/i,
    /daniel/i,
    /alex/i,
    /google us english/i,
    /google uk english female/i,
    /google uk english male/i,
    /microsoft aria/i,
    /microsoft guy/i,
    /microsoft sona/i,
    /microsoft jenny/i,
    /microsoft natasha/i,
    /natural/i,
    /enhanced/i,
    /premium/i,
    /neural/i,
    /en-us/i,
    /en-gb/i,
    /en-au/i,
  ];

  let voicesCache = [];
  let queue = [];
  let currentIndex = 0;
  let speaking = false;
  let paused = false;
  let listeners = [];
  let preferredVoiceURI = "";
  let rate = 0.95;
  let pitch = 1.0;

  function supported() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  function loadVoices() {
    if (!supported()) return [];
    voicesCache = window.speechSynthesis.getVoices() || [];
    return voicesCache;
  }

  function englishVoices() {
    const all = loadVoices();
    const en = all.filter((v) => /^en(-|_|$)/i.test(v.lang) || /english/i.test(v.name));
    return en.length ? en : all;
  }

  function pickBestVoice() {
    const list = englishVoices();
    if (!list.length) return null;

    if (preferredVoiceURI) {
      const preferred = list.find((v) => v.voiceURI === preferredVoiceURI);
      if (preferred) return preferred;
    }

    for (let i = 0; i < PREFERRED_VOICE_PATTERNS.length; i++) {
      const re = PREFERRED_VOICE_PATTERNS[i];
      const hit = list.find((v) => re.test(v.name) || re.test(v.voiceURI));
      if (hit) return hit;
    }

    // Prefer local voices (often smoother on macOS/iOS)
    const local = list.find((v) => v.localService);
    return local || list[0];
  }

  function emit(event, payload) {
    listeners.forEach((fn) => {
      try {
        fn(event, payload);
      } catch (_) {
        /* ignore listener errors */
      }
    });
  }

  function on(fn) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((x) => x !== fn);
    };
  }

  function cleanText(text) {
    return String(text || "")
      .replace(/[·•]/g, ", ")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  /** Split long text into speakable chunks (API limits + natural pauses) */
  function chunkText(text, maxLen) {
    const cleaned = cleanText(text);
    if (!cleaned) return [];
    if (cleaned.length <= maxLen) return [cleaned];

    const parts = [];
    const sentences = cleaned.match(/[^.!?]+[.!?]+\s*|[^.!?]+$/g) || [cleaned];
    let buf = "";

    sentences.forEach((s) => {
      const piece = s.trim();
      if (!piece) return;
      if ((buf + " " + piece).trim().length <= maxLen) {
        buf = (buf + " " + piece).trim();
      } else {
        if (buf) parts.push(buf);
        if (piece.length <= maxLen) {
          buf = piece;
        } else {
          // hard split long run-ons
          for (let i = 0; i < piece.length; i += maxLen) {
            parts.push(piece.slice(i, i + maxLen));
          }
          buf = "";
        }
      }
    });
    if (buf) parts.push(buf);
    return parts;
  }

  function stop() {
    if (!supported()) return;
    queue = [];
    currentIndex = 0;
    speaking = false;
    paused = false;
    window.speechSynthesis.cancel();
    emit("stop");
    emit("status", getStatus());
  }

  function pause() {
    if (!supported() || !speaking) return;
    window.speechSynthesis.pause();
    paused = true;
    emit("pause");
    emit("status", getStatus());
  }

  function resume() {
    if (!supported()) return;
    if (paused) {
      window.speechSynthesis.resume();
      paused = false;
      speaking = true;
      emit("resume");
      emit("status", getStatus());
    }
  }

  function speakNext() {
    if (!supported()) return;
    if (currentIndex >= queue.length) {
      speaking = false;
      paused = false;
      emit("end");
      emit("status", getStatus());
      return;
    }

    const text = queue[currentIndex];
    const utter = new SpeechSynthesisUtterance(text);
    const voice = pickBestVoice();
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang || "en-US";
    } else {
      utter.lang = "en-US";
    }
    // Slightly slower than default for a calmer “library” feel
    utter.rate = rate;
    utter.pitch = pitch;
    utter.volume = 1;

    utter.onstart = () => {
      speaking = true;
      paused = false;
      emit("chunk", { index: currentIndex, total: queue.length, text });
      emit("status", getStatus());
    };

    utter.onend = () => {
      currentIndex += 1;
      // Small gap between chunks for a more natural cadence
      setTimeout(speakNext, 180);
    };

    utter.onerror = (e) => {
      // "interrupted" is normal on cancel/skip
      if (e && e.error === "interrupted") return;
      currentIndex += 1;
      setTimeout(speakNext, 80);
    };

    window.speechSynthesis.speak(utter);
  }

  /**
   * Speak a script: string or array of {label?, text} sections.
   * Sections are announced lightly for podcast-like structure.
   */
  function speak(script, options) {
    if (!supported()) {
      emit("unsupported");
      return false;
    }

    stop();
    // Cancel leaves residual state in some browsers
    window.speechSynthesis.cancel();

    const opts = options || {};
    if (typeof opts.rate === "number") rate = opts.rate;
    if (typeof opts.pitch === "number") pitch = opts.pitch;
    if (opts.voiceURI) preferredVoiceURI = opts.voiceURI;

    const sections = Array.isArray(script)
      ? script
      : [{ text: String(script || "") }];

    const chunks = [];
    sections.forEach((sec) => {
      const label = sec.label ? cleanText(sec.label) : "";
      const body = cleanText(sec.text);
      if (!body && !label) return;
      if (label) chunks.push(label + ".");
      chunkText(body, 420).forEach((c) => chunks.push(c));
    });

    if (!chunks.length) return false;

    queue = chunks;
    currentIndex = 0;
    speaking = true;
    paused = false;

    // Chrome bug: sometimes needs a kick after cancel
    setTimeout(() => {
      emit("start", { chunks: queue.length });
      emit("status", getStatus());
      speakNext();
    }, 60);

    return true;
  }

  function getStatus() {
    return {
      supported: supported(),
      speaking: speaking && !paused,
      paused,
      active: speaking || paused,
      progress: queue.length ? currentIndex / queue.length : 0,
      index: currentIndex,
      total: queue.length,
      rate,
      voice: pickBestVoice(),
    };
  }

  function listVoices() {
    return englishVoices().map((v) => ({
      name: v.name,
      lang: v.lang,
      voiceURI: v.voiceURI,
      localService: v.localService,
      default: v.default,
    }));
  }

  function setVoice(voiceURI) {
    preferredVoiceURI = voiceURI || "";
    emit("voice", pickBestVoice());
  }

  function setRate(r) {
    rate = Math.min(1.4, Math.max(0.7, Number(r) || 0.95));
    emit("status", getStatus());
  }

  // Populate voices (async on some browsers)
  if (supported()) {
    loadVoices();
    if (typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    // Periodic refresh — Safari sometimes populates late
    setTimeout(loadVoices, 250);
    setTimeout(loadVoices, 1000);
  }

  global.WealthTTS = {
    supported,
    speak,
    stop,
    pause,
    resume,
    on,
    getStatus,
    listVoices,
    setVoice,
    setRate,
    pickBestVoice,
  };
})(typeof window !== "undefined" ? window : this);
