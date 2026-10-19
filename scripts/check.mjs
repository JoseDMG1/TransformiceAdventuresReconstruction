import { readdirSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === "assets" ? [] : sourceFiles(filename);
    return /\.(?:m?js)$/.test(filename) ? [filename] : [];
  });
}
const files = [...sourceFiles("dist"), ...sourceFiles("scripts")];
for (const filename of files) {
  const result = spawnSync(process.execPath, ["--check", filename], { encoding: "utf8", windowsHide: true });
  if (result.status !== 0) {
    process.stderr.write(result.stderr || String(result.error));
    process.exit(1);
  }
}
console.log(`Sintaxis correcta en ${files.length} archivos.`);
