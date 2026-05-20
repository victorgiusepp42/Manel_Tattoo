/**
 * Remove fundo preto da logo. Requer: npm install sharp --save-dev
 * Uso: node scripts/remove-logo-bg.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public", "manel-logo.png");
const output = join(root, "public", "manel-logo-clean.png");

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max < 42 || (max < 72 && max - min < 18)) {
    data[i + 3] = 0;
  }
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile(output);

console.log("Logo salva com fundo transparente:", output);
