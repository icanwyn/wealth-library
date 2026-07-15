/**
 * Vercel serverless proxy → ElevenLabs text-to-speech.
 * Keeps ELEVENLABS_API_KEY off the client.
 */
const DEFAULT_VOICE = "iP95p4xoKVk53GoZ742B"; // Chris — casual American, strong for spoken rap
const DEFAULT_MODEL = "eleven_multilingual_v2";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    res.status(500).json({ error: "ELEVENLABS_API_KEY is not configured on the server" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: "Invalid JSON body" });
      return;
    }
  }
  body = body || {};

  const text = String(body.text || "").trim();
  if (!text) {
    res.status(400).json({ error: "Missing text" });
    return;
  }
  // ElevenLabs hard limit safety
  if (text.length > 4500) {
    res.status(400).json({ error: "Text too long; max 4500 characters per request" });
    return;
  }

  const voiceId = String(body.voice_id || body.voiceId || DEFAULT_VOICE).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  if (!voiceId) {
    res.status(400).json({ error: "Invalid voice_id" });
    return;
  }

  const modelId = String(body.model_id || body.modelId || DEFAULT_MODEL);
  const stability =
    typeof body.stability === "number" ? body.stability : 0.38;
  const similarity =
    typeof body.similarity_boost === "number" ? body.similarity_boost : 0.78;
  const style = typeof body.style === "number" ? body.style : 0.55;

  try {
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": key,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          voice_settings: {
            stability,
            similarity_boost: similarity,
            style,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      let message = `ElevenLabs error ${upstream.status}`;
      try {
        const j = JSON.parse(errText);
        message = j.detail?.message || j.detail || j.message || message;
        if (typeof message === "object") message = JSON.stringify(message);
      } catch {
        if (errText) message = errText.slice(0, 280);
      }
      res.status(upstream.status === 401 ? 502 : upstream.status).json({
        error: message,
      });
      return;
    }

    const buf = Buffer.from(await upstream.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Length", String(buf.length));
    res.status(200).send(buf);
  } catch (e) {
    res.status(502).json({
      error: e && e.message ? e.message : "Failed to reach ElevenLabs",
    });
  }
};
