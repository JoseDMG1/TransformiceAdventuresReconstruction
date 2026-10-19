// Read the previously decoded original binary; never execute the archived client.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const root = 'dist/assets/original';
const metadata = JSON.parse(await readFile('reference/original-data/animation-metadata.json', 'utf8'));
const selected = [15, 17, 30, 32, 38, 41, 43, 44, 45, 46, 47, 49, 50];
const clothingCodes = [5, 6, 8, 11, 14, 15, 16, 17, 18, 20, 22, 26, 27];
const refs = new Map();
function image(name, source, owner) {
  if (!name?.startsWith('@')) return;
  const nameWithoutMarker = name.slice(1);
  const resource = (nameWithoutMarker.startsWith('+') ? 'anim/' + nameWithoutMarker.slice(1) : source + nameWithoutMarker).replaceAll('\\', '/').replace(/^\/+/, '');
  if (!resource.endsWith('.png')) return;
  if (!refs.has(resource)) refs.set(resource, { resource, owners: [] });
  if (!refs.get(resource).owners.includes(owner)) refs.get(resource).owners.push(owner);
}
function collect(clip, owner) {
  image(clip.name, clip.source, owner);
  for (const animation of clip.animations ?? []) for (const child of animation.children) image(child.name, clip.source, owner);
  for (const child of clip.children ?? []) collect(child.clip, owner);
}
for (const monster of metadata.monsters.filter(m => selected.includes(m.id))) collect(monster.clip, monster.id);
for (const clothing of metadata.clothing.filter(c => clothingCodes.includes(c.code))) for (const part of clothing.parts) image('@' + part.name + '.png', `equipement/${clothing.code}/`, `clothing:${clothing.code}`);
const entries = [...refs.values()];
const results = [];
let cursor = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (cursor < entries.length) {
    const entry = entries[cursor++];
    const url = 'https://data.atelier801.com/tfmadv/' + entry.resource;
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
      if (!response.ok) { results.push({ ...entry, url, status: response.status }); continue; }
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('Response is not a PNG');
      const target = path.join(root, entry.resource);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, bytes);
      results.push({ ...entry, url, status: response.status, bytes: bytes.length, width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), sha256: createHash('sha256').update(bytes).digest('hex') });
    } catch (error) { results.push({ ...entry, url, error: String(error) }); }
  }
}));
results.sort((a,b) => a.resource.localeCompare(b.resource));
await writeFile('reference/original-data/extra-image-downloads.json', JSON.stringify(results, null, 2));
const runtime = JSON.parse(await readFile(root + '/creatures.json', 'utf8'));
for (const monster of metadata.monsters.filter(m => selected.includes(m.id))) if (!runtime.monsters.some(m => m.id === monster.id)) runtime.monsters.push(monster);
for (const clothing of metadata.clothing.filter(c => clothingCodes.includes(c.code))) if (!runtime.clothing.some(c => c.code === clothing.code)) runtime.clothing.push(clothing);
runtime.monsters.sort((a,b) => a.id-b.id);
runtime.clothing.sort((a,b) => a.code-b.code);
await writeFile(root + '/creatures.json', JSON.stringify(runtime));
const previous = JSON.parse(await readFile(root + '/animation-image-downloads.json', 'utf8'));
const combined = new Map(previous.map(entry => [entry.resource, entry]));
for (const entry of results) if (entry.bytes) combined.set(entry.resource, entry);
await writeFile(root + '/animation-image-downloads.json', JSON.stringify([...combined.values()], null, 2));
console.log(JSON.stringify({ selected, clothingCodes, referenced: entries.length, downloaded: results.filter(r => r.bytes).length, failures: results.filter(r => !r.bytes), runtimeBytes: (await readFile(root + '/creatures.json')).length }, null, 2));
