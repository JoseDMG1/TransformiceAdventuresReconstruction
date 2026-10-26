import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";

const source = "reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceLiensExternesADV.js";
const sourceBytes = await readFile(source);
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const output = "dist/assets/original/interface/external-icons";
await mkdir(output, { recursive: true });
const records = [];
for (const name of ["KS", "forum", "discord", "twitter"]) {
  if (!sourceBytes.toString("utf8").includes(`ajouterBouton("${name}"`)) throw Error("Unverified icon: " + name);
  const url = `https://data.atelier801.com/tfmadv/interface/bouton-${name}.png`;
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw Error(`${name}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") throw Error("Invalid PNG: " + name);
  const file = `bouton-${name}.png`;
  await writeFile(`${output}/${file}`, bytes);
  records.push({ file, url, bytes: bytes.length, width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), sha256: hash(bytes) });
}
await writeFile(`${output}/manifest.json`, JSON.stringify({ source, sourceSha256: hash(sourceBytes), records }, null, 2));
console.log(JSON.stringify(records));
