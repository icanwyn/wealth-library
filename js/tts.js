/**
 * Wealth — ElevenLabs TTS reader (hip-hop song delivery)
 * Audio is generated server-side via /api/tts so the API key never ships to the browser.
 * Falls back to Web Speech API if the proxy is unavailable.
 */
(function (global) {
  "use strict";

  const DEFAULT_VOICE = "iP95p4xoKVk53GoZ742B"; // Chris
  const CHUNK_MAX = 2200;

  const CURATED_VOICES = [
    {
      voiceURI: "iP95p4xoKVk53GoZ742B",
      name: "Chris — casual American (rap-friendly)",
      lang: "en-US",
      default: true,
      provider: "elevenlabs",
    },
    {
      voiceURI: "pNInz6obpgDQGcFmaJgB",
      name: "Adam — deep American",
      lang: "en-US",
      provider: "elevenlabs",
    },
    {
      voiceURI: "TxGEqnHWrfWFTfGW9XjX",
      name: "Josh — young American",
      lang: "en-US",
      provider: "elevenlabs",
    },
    {
      voiceURI: "ErXwobaYiN019PkySvjV",
      name: "Antoni — well-rounded",
      lang: "en-US",
      provider: "elevenlabs",
    },
    {
      voiceURI: "VR6AewLTigWG4xSOukaG",
      name: "Arnold — crisp American",
      lang: "en-US",
      provider: "elevenlabs",
    },
    {
      voiceURI: "yoZ06aMxZJJ28mfd3POQ",
      name: "Sam — dynamic",
      lang: "en-US",
      provider: "elevenlabs",
    },
    {
      voiceURI: "nPczCjzI2devNBz1zQrb",
      name: "Brian — deep narrative",
      lang: "en-US",
      provider: "elevenlabs",
    },
    {
      voiceURI: "21m00Tcm4TlvDq8ikWAM",
      name: "Rachel — warm American",
      lang: "en-US",
      provider: "elevenlabs",
    },
    {
      voiceURI: "EXAVITQu4vr4xnSDxMaL",
      name: "Bella — soft American",
      lang: "en-US",
      provider: "elevenlabs",
    },
    {
      voiceURI: "onwK4e9ZLuTAKqWW03F9",
      name: "Daniel — British authority",
      lang: "en-GB",
      provider: "elevenlabs",
    },
  ];

  let voicesCache = CURATED_VOICES.slice();
  let queue = [];
  let currentIndex = 0;
  let speaking = false;
  let paused = false;
  let listeners = [];
  let preferredVoiceURI = DEFAULT_VOICE;
  let rate = 0.98;
  let audioEl = null;
  let objectUrls = [];
  let abortCtrl = null;
  let useEleven = true;
  let lastError = "";

  function supported() {
    return typeof window !== "undefined" && typeof Audio !== "undefined";
  }

  function emit(event, payload) {
    listeners.forEach((fn) => {
      try {
        fn(event, payload);
      } catch (_) {
        /* ignore */
      }
    });
  }

  function on(fn) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((x) => x !== fn);
    };
  }

  function revokeUrls() {
    objectUrls.forEach((u) => {
      try {
        URL.revokeObjectURL(u);
      } catch (_) {
        /* ignore */
      }
    });
    objectUrls = [];
  }

  function destroyAudio() {
    if (audioEl) {
      try {
        audioEl.onended = null;
        audioEl.onerror = null;
        audioEl.onplay = null;
        audioEl.pause();
        audioEl.removeAttribute("src");
        audioEl.load();
      } catch (_) {
        /* ignore */
      }
      audioEl = null;
    }
  }

  /**
   * Prep text for speech.
   * Never say song structure out loud — strip [Chorus] / [Verse] / [Bridge] /
   * [Outro] labels (and bare "Chorus." / "Verse 1" lines). Keep all lyrics.
   */
  function cleanText(text) {
    return String(text || "")
      .replace(/\r\n/g, "\n")
      // Remove [Chorus], [Verse 1], [Bridge] (notes…), [Verse 3 / Outro], etc.
      .replace(/\[(?:Chorus|Verse[^\]]*|Bridge[^\]]*|Outro[^\]]*)\]/gi, "")
      // Remove bare structure-only lines
      .replace(
        /^\s*(?:Chorus|Verse\s*\d+(?:\s*\/\s*Outro)?|Bridge|Outro)\s*[.:]?\s*$/gim,
        ""
      )
      .replace(/\(Slower[^)]*\)/gi, "")
      .replace(/\(maybe with vocal chops\)/gi, "")
      .replace(/[·•]/g, ", ")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/—/g, " — ")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n /g, "\n")
      .trim();
  }

  function chunkText(text, maxLen) {
    const cleaned = cleanText(text);
    if (!cleaned) return [];
    if (cleaned.length <= maxLen) return [cleaned];

    const parts = [];
    // Prefer paragraph / sentence breaks for song flow
    const blocks = cleaned.split(/\n\n+/);
    let buf = "";

    function flush() {
      if (buf.trim()) parts.push(buf.trim());
      buf = "";
    }

    function pushPiece(piece) {
      piece = piece.trim();
      if (!piece) return;
      if ((buf + "\n\n" + piece).trim().length <= maxLen) {
        buf = buf ? buf + "\n\n" + piece : piece;
        return;
      }
      flush();
      if (piece.length <= maxLen) {
        buf = piece;
        return;
      }
      const sentences = piece.match(/[^.!?\n]+[.!?\n]+\s*|[^.!?\n]+$/g) || [piece];
      sentences.forEach((s) => {
        const t = s.trim();
        if (!t) return;
        if ((buf + " " + t).trim().length <= maxLen) {
          buf = (buf + " " + t).trim();
        } else {
          flush();
          if (t.length <= maxLen) {
            buf = t;
          } else {
            for (let i = 0; i < t.length; i += maxLen) {
              parts.push(t.slice(i, i + maxLen));
            }
            buf = "";
          }
        }
      });
    }

    blocks.forEach(pushPiece);
    flush();
    return parts;
  }

  function pickBestVoice() {
    const list = voicesCache.length ? voicesCache : CURATED_VOICES;
    if (preferredVoiceURI) {
      const hit = list.find((v) => v.voiceURI === preferredVoiceURI);
      if (hit) return hit;
    }
    return list.find((v) => v.default) || list[0] || null;
  }

  function listVoices() {
    return (voicesCache.length ? voicesCache : CURATED_VOICES).map((v) => ({
      name: v.name,
      lang: v.lang || "en",
      voiceURI: v.voiceURI,
      localService: !!v.localService,
      default: !!v.default,
      provider: v.provider || "elevenlabs",
    }));
  }

  function setVoice(voiceURI) {
    preferredVoiceURI = voiceURI || DEFAULT_VOICE;
    emit("voice", pickBestVoice());
  }

  function setRate(r) {
    rate = Math.min(1.35, Math.max(0.7, Number(r) || 0.98));
    if (audioEl) audioEl.playbackRate = rate;
    emit("status", getStatus());
  }

  function getStatus() {
    const v = pickBestVoice();
    return {
      supported: supported(),
      speaking: speaking && !paused,
      paused,
      active: speaking || paused,
      progress: queue.length ? currentIndex / queue.length : 0,
      index: currentIndex,
      total: queue.length,
      rate,
      voice: v,
      provider: useEleven ? "elevenlabs" : "webspeech",
      error: lastError,
    };
  }

  function stop() {
    if (abortCtrl) {
      try {
        abortCtrl.abort();
      } catch (_) {
        /* ignore */
      }
      abortCtrl = null;
    }
    queue = [];
    currentIndex = 0;
    speaking = false;
    paused = false;
    destroyAudio();
    revokeUrls();
    // also cancel browser TTS fallback
    try {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    } catch (_) {
      /* ignore */
    }
    emit("stop");
    emit("status", getStatus());
  }

  function pause() {
    if (!speaking || paused) return;
    if (audioEl && !audioEl.paused) {
      audioEl.pause();
      paused = true;
      emit("pause");
      emit("status", getStatus());
      return;
    }
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.pause();
        paused = true;
        emit("pause");
        emit("status", getStatus());
      }
    } catch (_) {
      /* ignore */
    }
  }

  function resume() {
    if (!paused) return;
    if (audioEl) {
      audioEl
        .play()
        .then(() => {
          paused = false;
          speaking = true;
          emit("resume");
          emit("status", getStatus());
        })
        .catch(() => {
          /* ignore */
        });
      return;
    }
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.resume();
        paused = false;
        speaking = true;
        emit("resume");
        emit("status", getStatus());
      }
    } catch (_) {
      /* ignore */
    }
  }

  async function fetchElevenAudio(text, signal) {
    const voice = preferredVoiceURI || DEFAULT_VOICE;
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        voice_id: voice,
        // More expressive delivery for songs
        stability: 0.36,
        similarity_boost: 0.8,
        style: 0.58,
        model_id: "eleven_multilingual_v2",
      }),
      signal,
    });

    if (!res.ok) {
      let msg = `TTS failed (${res.status})`;
      try {
        const j = await res.json();
        if (j && j.error) msg = String(j.error);
      } catch (_) {
        /* ignore */
      }
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    objectUrls.push(url);
    return url;
  }

  function playUrl(url) {
    return new Promise((resolve, reject) => {
      destroyAudio();
      const a = new Audio(url);
      audioEl = a;
      a.playbackRate = rate;
      a.preload = "auto";

      a.onplay = () => {
        speaking = true;
        paused = false;
        emit("chunk", {
          index: currentIndex,
          total: queue.length,
          text: queue[currentIndex],
        });
        emit("status", getStatus());
      };

      a.onended = () => resolve();
      a.onerror = () => reject(new Error("Audio playback failed"));

      const p = a.play();
      if (p && typeof p.catch === "function") {
        p.catch((e) => reject(e || new Error("Playback blocked")));
      }
    });
  }

  async function speakNextEleven() {
    if (currentIndex >= queue.length) {
      speaking = false;
      paused = false;
      destroyAudio();
      emit("end");
      emit("status", getStatus());
      return;
    }

    const text = queue[currentIndex];
    abortCtrl = new AbortController();

    try {
      const url = await fetchElevenAudio(text, abortCtrl.signal);
      if (!speaking && !paused) return; // stopped mid-fetch
      await playUrl(url);
      if (!speaking && !paused) return;
      currentIndex += 1;
      // short breath between song sections
      setTimeout(() => {
        if (speaking || currentIndex < queue.length) speakNextEleven();
      }, 220);
    } catch (e) {
      if (e && e.name === "AbortError") return;
      lastError = (e && e.message) || "ElevenLabs error";
      // Fallback to Web Speech for remaining text if API hard-fails
      if (e && (e.status === 404 || e.status === 500 || e.status === 502)) {
        useEleven = false;
        emit("status", getStatus());
        speakWebSpeechFrom(currentIndex);
        return;
      }
      // skip bad chunk and continue
      currentIndex += 1;
      setTimeout(speakNextEleven, 100);
    }
  }

  function speakWebSpeechFrom(startIdx) {
    if (!window.speechSynthesis) {
      speaking = false;
      emit("unsupported");
      emit("status", getStatus());
      return;
    }
    const rest = queue.slice(startIdx);
    if (!rest.length) {
      speaking = false;
      emit("end");
      emit("status", getStatus());
      return;
    }

    let i = 0;
    const next = () => {
      if (i >= rest.length) {
        speaking = false;
        paused = false;
        emit("end");
        emit("status", getStatus());
        return;
      }
      const utter = new SpeechSynthesisUtterance(rest[i]);
      utter.rate = rate;
      utter.pitch = 1;
      utter.lang = "en-US";
      utter.onstart = () => {
        speaking = true;
        paused = false;
        currentIndex = startIdx + i;
        emit("chunk", {
          index: currentIndex,
          total: queue.length,
          text: rest[i],
        });
        emit("status", getStatus());
      };
      utter.onend = () => {
        i += 1;
        setTimeout(next, 160);
      };
      utter.onerror = () => {
        i += 1;
        setTimeout(next, 80);
      };
      window.speechSynthesis.speak(utter);
    };
    next();
  }

  function speak(script, options) {
    if (!supported()) {
      emit("unsupported");
      return false;
    }

    stop();
    lastError = "";
    useEleven = true;

    const opts = options || {};
    if (typeof opts.rate === "number") rate = opts.rate;
    if (opts.voiceURI) preferredVoiceURI = opts.voiceURI;

    const sections = Array.isArray(script)
      ? script
      : [{ text: String(script || "") }];

    const chunks = [];
    sections.forEach((sec) => {
      const label = sec.label ? cleanText(sec.label) : "";
      const body = cleanText(sec.text);
      if (!body && !label) return;
      // Keep label with body when possible for better song continuity
      const combined = label ? `${label}.\n\n${body}` : body;
      chunkText(combined, CHUNK_MAX).forEach((c) => chunks.push(c));
    });

    if (!chunks.length) return false;

    queue = chunks;
    currentIndex = 0;
    speaking = true;
    paused = false;

    setTimeout(() => {
      emit("start", { chunks: queue.length, provider: "elevenlabs" });
      emit("status", getStatus());
      speakNextEleven();
    }, 40);

    return true;
  }

  function loadRemoteVoices() {
    return fetch("/api/voices", { method: "GET" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.voices) && data.voices.length) {
          voicesCache = data.voices;
          emit("voices", voicesCache);
          emit("status", getStatus());
        }
        return voicesCache;
      })
      .catch(() => voicesCache);
  }

  if (supported()) {
    setTimeout(loadRemoteVoices, 200);
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
    loadRemoteVoices,
    provider: "elevenlabs",
  };
})(typeof window !== "undefined" ? window : this);
