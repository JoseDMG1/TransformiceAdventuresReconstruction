import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const source = "reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceQueteADV.js";
const sourceBytes = await readFile(source);
if (!sourceBytes.toString("utf8").includes('../_animation/ClipAnimProjection'))
  throw Error("Missing explicit projection import in archived quest interface");
const url = "https://transformice-adventures.com/dist/Transformice-adventure-client/src/_animation/ClipAnimProjection.js";
const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
if (!response.ok) throw Error(`Projection source HTTP ${response.status}`);
const bytes = Buffer.from(await response.arrayBuffer());
if (!bytes.toString("utf8").includes("ClipAnimProjection.prototype") || bytes.toString("utf8").includes("<!DOCTYPE html"))
  throw Error("Response is not the referenced projection module");
const file = "reference/original-data/ClipAnimProjection-recovered.js";
await writeFile(file, bytes);
const sha256 = data => createHash("sha256").update(data).digest("hex");
const record = { url, finalURL: response.url, retrievedAt: new Date().toISOString(),
  source, sourceSha256: sha256(sourceBytes), file, bytes: bytes.length, sha256: sha256(bytes) };
await writeFile("reference/original-data/ground-projection-download.json", JSON.stringify(record, null, 2));
console.log(JSON.stringify(record));
