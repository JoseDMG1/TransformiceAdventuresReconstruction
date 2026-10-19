import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const metadataPath = "reference/original-data/animation-metadata.json";
const outputRoot = "dist/assets/original";
const baseURL = "https://data.atelier801.com/tfmadv/";
const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
const chest = metadata.monsters?.find((entry) => entry.id === 14);
if (!chest || chest.clip?.source !== "monstre/coffre1/") {
  throw new Error("REA metadata did not identify the original chest as monster 14.");
}

const resources = new Set();
function collect(clip) {
  for (const animation of clip.animations ?? []) {
    for (const child of animation.children ?? []) {
      if (child.name?.startsWith("@")) {
        const name = child.name.slice(1);
        const resource = name.startsWith("+")
          ? `anim/${name.slice(1)}`
          : `${clip.source}${name}`;
        if (resource.endsWith(".png")) resources.add(resource.replaceAll("\\", "/"));
      }
    }
  }
  for (const child of clip.children ?? []) collect(child.clip);
}
collect(chest.clip);
if (!["monstre/coffre1/ombre.png", ...[1, 2, 3, 4, 5].map((n) => `monstre/coffre1/coffre${n}.png`)].every((name) => resources.has(name))) {
  throw new Error(`Chest metadata is incomplete: ${[...resources].join(", ")}`);
}

await mkdir(outputRoot, { recursive: true });
const result = await Promise.all([...resources].sort().map(download));
const imageEntries = await readJson(path.join(outputRoot, "animation-image-downloads.json"));
const references = await readJson(path.join(outputRoot, "animation-image-references.json"));
mergeByResource(imageEntries, result);
mergeByResource(references, result.map(({ resource, owner }) => ({ resource, owner })));
await writeFile(path.join(outputRoot, "animation-image-downloads.json"), `${JSON.stringify(imageEntries, null, 2)}\n`);
await writeFile(path.join(outputRoot, "animation-image-references.json"), `${JSON.stringify(references, null, 2)}\n`);

const creaturesPath = path.join(outputRoot, "creatures.json");
const creatures = await readJson(creaturesPath);
creatures.monsters = creatures.monsters ?? [];
if (!creatures.monsters.some((entry) => entry.id === chest.id)) creatures.monsters.push(chest);
creatures.monsters.sort((a, b) => a.id - b.id);
await writeFile(creaturesPath, JSON.stringify(creatures));

console.log(JSON.stringify({
  monsterId: chest.id,
  stateNames: chest.clip.children.map((entry) => entry.name),
  requested: result.length,
  recovered: result.filter((entry) => entry.bytes).length,
  manifest: "dist/assets/original/animation-image-downloads.json",
}, null, 2));

async function download(resource) {
  const url = baseURL + resource;
  const target = path.join(outputRoot, resource);
  await mkdir(path.dirname(target), { recursive: true });
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) return { resource, owner: chest.id, url, status: response.status };
  const contentType = response.headers.get("content-type") || "";
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!contentType.toLowerCase().includes("image/png") || !isPNG(bytes)) {
    return { resource, owner: chest.id, url, status: response.status, contentType, error: "Response was not PNG." };
  }
  await writeFile(target, bytes);
  return {
    resource,
    owner: chest.id,
    url,
    status: response.status,
    contentType,
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

function mergeByResource(target, additions) {
  const byResource = new Map(target.map((entry) => [entry.resource, entry]));
  for (const entry of additions) byResource.set(entry.resource, entry);
  target.splice(0, target.length, ...byResource.values());
}

function isPNG(bytes) {
  return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
}
