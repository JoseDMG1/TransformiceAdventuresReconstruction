// Literal calls in InterfaceQueteADV plus the recovered MoteurSon URL builder.
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(import.meta.dirname, "..");
const questFile = "reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceQueteADV.js";
const questSource = await fs.readFile(path.join(root, questFile), "utf8");
const sourceURL = "https://transformice-adventures.com/dist/Souritheque-client/src/outils/son/MoteurSon.js";
const response = await fetch(sourceURL, { signal: AbortSignal.timeout(20000) });
if (!response.ok) throw new Error(`Audio source: HTTP ${response.status}`);
const sourceBytes = Buffer.from(await response.arrayBuffer());
const sourceText = sourceBytes.toString("utf8");
if (!sourceText.includes('MoteurSon.DOSSIER_MUSIQUE + NOM + ".mp3"'))
  throw new Error("The original sound URL builder changed; inspect it before recovery");
const digest = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
await fs.writeFile(path.join(root, "reference/original-data/MoteurSon-recovered.js"), sourceBytes);
await fs.writeFile(path.join(root, "reference/original-data/ui-audio-source-download.json"), JSON.stringify({
  url: sourceURL, status: response.status, bytes: sourceBytes.length,
  sha256: digest(sourceBytes), recoveredAt: new Date().toISOString(),
}, null, 2) + "\n");
const names = [...questSource.matchAll(/jouerEffet\("([^"]+)"\)/g)].map(match => match[1]);
if (names.length !== 2 || !names.includes("objectif") || !names.includes("objectif2"))
  throw new Error("Inspect the quest sound declarations before downloading");
const directory = path.join(root, "dist/assets/original/audio");
const records = await Promise.all(names.map(async name => {
  const url = `https://data.atelier801.com/tfmadv/sons/${name}.mp3`;
  const result = await fetch(url, { signal: AbortSignal.timeout(20000) });
  const bytes = Buffer.from(await result.arrayBuffer());
  const type = result.headers.get("content-type") ?? "";
  if (!result.ok) return { name, url, status: result.status };
  const mp3 = bytes.subarray(0, 3).toString() === "ID3"
    || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0);
  if (!type.includes("audio/mpeg") || !mp3)
    throw new Error(`Unexpected audio response: ${name}`);
  await fs.writeFile(path.join(directory, `${name}.mp3`), bytes);
  return { name, url, status: result.status, file: `${name}.mp3`,
    bytes: bytes.length, sha256: digest(bytes) };
}));
await fs.writeFile(path.join(directory, "quest-audio-manifest.json"), JSON.stringify({
  recoveredAt: new Date().toISOString(),
  evidence: [questFile, "reference/original-data/MoteurSon-recovered.js",
    "reference/wayback-client/dist/Transformice-adventure-client/src/_tfmAdventure/TFMAdventure.js"],
  records,
}, null, 2) + "\n");
console.log(JSON.stringify({ requested: records.length,
  recovered: records.filter(r => r.file).length, missing: records.filter(r => !r.file).map(r => r.name) }));
