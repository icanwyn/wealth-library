/**
 * Optional: list curated + live ElevenLabs voices for the player.
 */
const CURATED = [
  {
    voice_id: "iP95p4xoKVk53GoZ742B",
    name: "Chris — casual American (rap-friendly)",
    lang: "en-US",
    tags: "default,hip-hop",
  },
  {
    voice_id: "pNInz6obpgDQGcFmaJgB",
    name: "Adam — deep American",
    lang: "en-US",
    tags: "deep",
  },
  {
    voice_id: "TxGEqnHWrfWFTfGW9XjX",
    name: "Josh — young American",
    lang: "en-US",
    tags: "young",
  },
  {
    voice_id: "ErXwobaYiN019PkySvjV",
    name: "Antoni — well-rounded",
    lang: "en-US",
    tags: "clear",
  },
  {
    voice_id: "VR6AewLTigWG4xSOukaG",
    name: "Arnold — crisp American",
    lang: "en-US",
    tags: "crisp",
  },
  {
    voice_id: "yoZ06aMxZJJ28mfd3POQ",
    name: "Sam — dynamic",
    lang: "en-US",
    tags: "dynamic",
  },
  {
    voice_id: "21m00Tcm4TlvDq8ikWAM",
    name: "Rachel — warm American",
    lang: "en-US",
    tags: "female",
  },
  {
    voice_id: "EXAVITQu4vr4xnSDxMaL",
    name: "Bella — soft American",
    lang: "en-US",
    tags: "female",
  },
  {
    voice_id: "onwK4e9ZLuTAKqWW03F9",
    name: "Daniel — British authority",
    lang: "en-GB",
    tags: "british",
  },
  {
    voice_id: "nPczCjzI2devNBz1zQrb",
    name: "Brian — deep narrative",
    lang: "en-US",
    tags: "deep,narrative",
  },
];

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const key = process.env.ELEVENLABS_API_KEY;
  // Always return curated list; enrich from API when key present
  let voices = CURATED.map((v) => ({
    voiceURI: v.voice_id,
    name: v.name,
    lang: v.lang,
    localService: false,
    default: v.voice_id === CURATED[0].voice_id,
    provider: "elevenlabs",
  }));

  if (key) {
    try {
      const r = await fetch("https://api.elevenlabs.io/v1/voices", {
        headers: { "xi-api-key": key },
      });
      if (r.ok) {
        const data = await r.json();
        const live = (data.voices || []).slice(0, 40).map((v) => ({
          voiceURI: v.voice_id,
          name: `${v.name}${v.labels?.accent ? " — " + v.labels.accent : ""}`,
          lang: "en",
          localService: false,
          default: false,
          provider: "elevenlabs",
        }));
        // Prefer curated first, then unique live voices
        const seen = new Set(voices.map((x) => x.voiceURI));
        for (const v of live) {
          if (!seen.has(v.voiceURI)) {
            voices.push(v);
            seen.add(v.voiceURI);
          }
        }
      }
    } catch {
      /* curated only */
    }
  }

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
  res.status(200).json({ voices, provider: "elevenlabs" });
};
