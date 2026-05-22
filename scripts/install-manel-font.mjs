/**
 * Copia a fonte oficial da marca para src/fonts/manel-display.*
 * Uso: MANEL_FONT_FILE="C:/caminho/ManelDisplay.woff2" node scripts/install-manel-font.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcFile = process.env.MANEL_FONT_FILE;

if (!srcFile) {
  console.error("Defina MANEL_FONT_FILE com o caminho do .woff2, .woff ou .ttf da marca.");
  process.exit(1);
}

if (!fs.existsSync(srcFile)) {
  console.error("Ficheiro não encontrado:", srcFile);
  process.exit(1);
}

const ext = path.extname(srcFile).toLowerCase();
const outDir = path.join(root, "src", "fonts");
const outFile = path.join(outDir, `manel-display${ext}`);

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(srcFile, outFile);
console.log("Fonte instalada:", outFile);
