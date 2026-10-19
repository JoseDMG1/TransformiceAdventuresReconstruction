// Recover only literal music/ambience paths declared by the archived client.
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(import.meta.dirname, "..");
const source = "https://data.atelier801.com/tfmadv/sons/";
const worldPath = path.join(root, "reference/original-data/MondeADV-2021.js");
const world = await fs.readFile(worldPath, "utf8");
const ambienceStart = world.indexOf("_this.listeAmbiance = [");
const musicEnd = world.indexOf("MondeADV.instance", ambienceStart);
if (ambienceStart < 0 || musicEnd < 0)
  throw new Error("No se encontraron las listas de audio originales en MondeADV-2021.js");
const sceneBlock = world.slice(ambienceStart, musicEnd);
const names = new Set(
  [...sceneBlock.matchAll(/lien:\s*["']([^"']+)["']/g)].map((match) => match[1]),
);

const sourceRoot = path.join(
  root,
  "reference/wayback-client/dist/Transformice-adventure-client/src",
);
for (const [relativePath, pattern] of [
  ["_tfmAdventure/TFMAdventure.js", /jouerMusique\(["']([^"']+)["']/g],
  ["interfaces/IntroADV.js", /jouerEffet\(["']([^"']+)["']/g],
]) {
  const text = await fs.readFile(path.join(sourceRoot, relativePath), "utf8");
  for (const match of text.matchAll(pattern))
    if (match[1].startsWith("musique/")) names.add(match[1]);
}

const directory = path.join(root, "dist/assets/original/audio");
await fs.mkdir(directory, { recursive: true });
const records = [];
const queue = [...names].sort();
async function worker() {
  while (queue.length) {
    const name = queue.shift();
    if (!/^(?:ambiance|musique)\/[\w-]+$/.test(name)) continue;
    const url = `${source}${name}.mp3`;
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!response.ok) {
        records.push({ name, url, status: response.status });
        continue;
      }
      const bytes = Buffer.from(await response.arrayBuffer());
      const type = response.headers.get("content-type") || "";
      const mp3 =
        bytes.subarray(0, 3).toString() === "ID3" ||
        (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0);
      if (!type.includes("audio/mpeg") || !mp3) {
        records.push({ name, url, status: "invalid-audio", contentType: type, bytes: bytes.length });
        continue;
      }
      const file = `${name}.mp3`;
      const target = path.join(directory, file);
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, bytes);
      records.push({
        name,
        url,
        file,
        bytes: bytes.length,
        sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
        status: 200,
      });
    } catch (error) {
      records.push({ name, url, status: "unavailable", reason: error.message });
    }
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
records.sort((a, b) => a.name.localeCompare(b.name));
await fs.writeFile(
  path.join(directory, "scene-audio-manifest.json"),
  JSON.stringify(
    {
      recoveredAt: new Date().toISOString(),
      source,
      evidence: [
        "reference/original-data/MondeADV-2021.js",
        "reference/wayback-client/dist/Transformice-adventure-client/src/_tfmAdventure/TFMAdventure.js",
        "reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/IntroADV.js",
      ],
      records,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify({
    requested: records.length,
    recovered: records.filter((record) => record.file).length,
    missing: records.filter((record) => !record.file).map((record) => record.name),
  }),
);
