// Fetch only exact names declared by the recovered original metadata/client.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root = path.resolve(import.meta.dirname, '..');
const metadata = JSON.parse(await fs.readFile(path.join(root, 'reference/original-data/animation-metadata.json'), 'utf8'));
const source = 'https://data.atelier801.com/tfmadv/sons/';
const client = path.join(root, 'reference/wayback-client/dist/Transformice-adventure-client/src');
const names = new Set(Object.values(metadata.sounds));
for (const file of ['interfaces/BarreXPADV.js', 'interfaces/InterfaceRecompenseRencontre.js', 'gameplay/armes/ArmeArc.js']) {
  const text = await fs.readFile(path.join(client, file), 'utf8');
  for (const match of text.matchAll(/jouerEffet\("([^"]+)"/g)) names.add(match[1]);
}
const directory = path.join(root, 'dist/assets/original/audio');
await fs.mkdir(directory, { recursive: true });
const records = [];
const queue = [...names];
async function worker() {
  while (queue.length) {
    const name = queue.shift();
    if (!/^[\w/-]+$/.test(name) || name.includes('..')) continue;
    const url = `${source}${name}.mp3`;
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!response.ok) { records.push({ name, url, status: response.status }); continue; }
      const bytes = Buffer.from(await response.arrayBuffer());
      const mp3 = bytes.subarray(0, 3).toString() === 'ID3' || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0);
      if (!mp3) { records.push({ name, url, status: 'not-mp3', bytes: bytes.length }); continue; }
      const file = `${name}.mp3`;
      await fs.mkdir(path.dirname(path.join(directory, file)), { recursive: true });
      await fs.writeFile(path.join(directory, file), bytes);
      records.push({ name, url, file, bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex'), status: 200 });
    } catch (error) { records.push({ name, url, status: 'unavailable', reason: error.message }); }
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
records.sort((a, b) => a.name.localeCompare(b.name));
await fs.writeFile(path.join(directory, 'manifest.json'), JSON.stringify({ recoveredAt: new Date().toISOString(), source, records }, null, 2));
console.log(JSON.stringify({ requested: records.length, recovered: records.filter(record => record.file).length, missing: records.filter(record => !record.file).map(record => record.name) }));
