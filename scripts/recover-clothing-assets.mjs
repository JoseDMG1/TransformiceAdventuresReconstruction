import { createHash } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const metadataPath = "reference/original-data/animation-metadata.json";
const outputRoot = "dist/assets/original";
const manifestPath = path.join(outputRoot, "clothing-downloads.json");
const baseURL = "https://data.atelier801.com/tfmadv/";
const concurrency = 8;
const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
if (!Array.isArray(metadata.clothing) || metadata.clothing.length !== 198) {
  throw new Error("Expected the retained 198-entry clothing metadata.");
}

const resources = new Map();
for (const look of metadata.clothing) {
  if (!Number.isInteger(look.code) || !Array.isArray(look.parts)) {
    throw new Error(`Invalid clothing metadata entry ${JSON.stringify(look.id)}.`);
  }
  for (const part of look.parts) {
    if (typeof part.name !== "string" || !/^[A-Za-z0-9_-]+$/.test(part.name)) {
      throw new Error(`Unsafe clothing part name in look ${look.code}.`);
    }
    const resource = `equipement/${look.code}/${part.name}.png`;
    resources.set(resource, { resource, lookCode: look.code, part: part.name });
  }
}

const prior = await readManifest();
const results = new Map(prior.map((entry) => [entry.resource, entry]));
const pending = [];
for (const entry of resources.values()) {
  const target = path.join(outputRoot, entry.resource);
  try {
    await access(target);
    const bytes = await readFile(target);
    if (isPNG(bytes)) {
      results.set(entry.resource, {
        ...entry,
        url: baseURL + entry.resource,
        status: 200,
        contentType: "image/png",
        bytes: bytes.length,
        sha256: createHash("sha256").update(bytes).digest("hex"),
      });
      continue;
    }
  } catch {
    // The exact resource is fetched below when it is absent locally.
  }
  pending.push(entry);
}

let cursor = 0;
let completed = 0;
let successes = 0;
async function worker() {
  while (cursor < pending.length) {
    const entry = pending[cursor++];
    const result = await download(entry);
    results.set(entry.resource, result);
    completed++;
    if (result.bytes) successes++;
    if (completed % 50 === 0 || completed === pending.length) {
      await writeManifest();
      console.log(`${completed}/${pending.length} processed; ${successes} recovered this run.`);
    }
  }
}

await mkdir(outputRoot, { recursive: true });
await Promise.all(Array.from({ length: Math.min(concurrency, pending.length) }, worker));
await writeManifest();
const all = [...results.values()].filter((entry) => resources.has(entry.resource));
console.log(JSON.stringify({
  definitions: metadata.clothing.length,
  uniqueParts: resources.size,
  alreadyPresent: resources.size - pending.length,
  recoveredThisRun: successes,
  http404: all.filter((entry) => entry.status === 404).length,
  failed: all.filter((entry) => entry.error || entry.status >= 500).length,
  manifest: manifestPath,
}, null, 2));

async function download(entry) {
  const target = path.join(outputRoot, entry.resource);
  await mkdir(path.dirname(target), { recursive: true });
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(baseURL + entry.resource, {
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) {
        if (response.status >= 500 && attempt < 3) continue;
        return { ...entry, url: baseURL + entry.resource, status: response.status };
      }
      const type = response.headers.get("content-type") || "";
      const bytes = Buffer.from(await response.arrayBuffer());
      if (!type.toLowerCase().includes("image/png") || !isPNG(bytes)) {
        return {
          ...entry,
          url: baseURL + entry.resource,
          status: response.status,
          contentType: type,
          error: "Response was not a PNG image.",
        };
      }
      await writeFile(target, bytes);
      return {
        ...entry,
        url: baseURL + entry.resource,
        status: response.status,
        contentType: type,
        bytes: bytes.length,
        sha256: createHash("sha256").update(bytes).digest("hex"),
      };
    } catch (error) {
      lastError = String(error);
    }
  }
  return { ...entry, url: baseURL + entry.resource, error: lastError || "Request failed." };
}

function isPNG(bytes) {
  return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
}

async function readManifest() {
  try {
    const parsed = JSON.parse(await readFile(manifestPath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeManifest() {
  const ordered = [...results.values()].sort((a, b) => a.resource.localeCompare(b.resource));
  await writeFile(manifestPath, `${JSON.stringify(ordered, null, 2)}\n`);
}
