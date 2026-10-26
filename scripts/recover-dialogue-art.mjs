// Exact image references in archived InterfaceDialogueADV.js; no client execution.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const sourcePath = 'reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceDialogueADV.js';
const source = await readFile(sourcePath, 'utf8');
const directory = 'dist/assets/original/interface/dialogue';
await mkdir(directory, { recursive: true });
const files = ['par9dialoguePNJ.png', 'noms_left.png', 'noms_mid.png', 'noms_right.png'];
const records = [];
for (const file of files) {
  if (!source.includes('tfmadv/interface/dialogue/' + file)) throw Error('Missing source reference: ' + file);
  const url = 'https://data.atelier801.com/tfmadv/interface/dialogue/' + file;
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw Error(`${file}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw Error('Invalid PNG: ' + file);
  await writeFile(directory + '/' + file, bytes);
  records.push({ file, url, bytes: bytes.length, width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), sha256: createHash('sha256').update(bytes).digest('hex') });
}
const wood = await readFile('reference/wayback-client/ressources/bois2.png');
await writeFile(directory + '/bois2.png', wood);
records.push({ file: 'bois2.png', source: 'reference/wayback-client/ressources/bois2.png', sha256: createHash('sha256').update(wood).digest('hex') });
await writeFile(directory + '/manifest.json', JSON.stringify({ sourcePath, sourceSha256: createHash('sha256').update(source).digest('hex'), records }, null, 2));
console.log(JSON.stringify(records));
