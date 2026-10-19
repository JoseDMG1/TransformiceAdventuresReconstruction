import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const codes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21, 22];
const baseURL = "https://data.atelier801.com/tfmadv/interface/icones/";
const outputRoot = "dist/assets/original/interface/icones";
const manifestPath = "reference/equipment-slot-icons-downloads.json";
await mkdir(outputRoot, { recursive: true });

const results = await Promise.all(codes.map(async (code) => {
  const resource = `equipement${code}.png`;
  const url = baseURL + resource;
  let error;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) return { code, resource, url, status: response.status };
      const type = response.headers.get("content-type") || "";
      const bytes = Buffer.from(await response.arrayBuffer());
      if (!type.toLowerCase().includes("image/png") || !isPNG(bytes)) {
        return { code, resource, url, status: response.status, error: "Response was not PNG." };
      }
      await writeFile(path.join(outputRoot, resource), bytes);
      return {
        code,
        resource,
        url,
        status: response.status,
        contentType: type,
        bytes: bytes.length,
        sha256: createHash("sha256").update(bytes).digest("hex"),
      };
    } catch (caught) {
      error = String(caught);
    }
  }
  return { code, resource, url, error };
}));

results.sort((a, b) => a.code - b.code);
await writeFile(manifestPath, `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify({ requested: codes.length, recovered: results.filter((entry) => entry.bytes).length, manifest: manifestPath }, null, 2));

function isPNG(bytes) {
  return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
}
