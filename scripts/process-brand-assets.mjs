/**
 * Logo com fundo transparente — remove só o preto ligado às bordas (preserva sombras/contornos internos).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assetsDir =
  process.env.BRAND_ASSETS_DIR ??
  "C:/Users/victo/.cursor/projects/c-Users-victo-projects-Manel-Tattoo/assets";

const SRC_DARK = path.join(
  assetsDir,
  "c__Users_victo_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_LOGO_MANEL_TATTOO_AMOSTRAS__2_-e0eeba53-03be-4719-8417-cbc0d57749ec.png",
);

const OUT_LOCKUP = path.join(root, "public", "manel-brand-lockup.png");

/** Preto de fundo conectado às bordas — não inclui cinzas da arte. */
const BG_MAX = 34;

function lumAt(data, channels, w, x, y) {
  const i = (y * w + x) * channels;
  return Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
}

function isEdgeBlack(data, channels, w, x, y) {
  const i = (y * w + x) * channels;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max <= BG_MAX || (max <= 48 && max - min < 14);
}

function floodBackground(data, w, h, channels) {
  const bg = new Uint8Array(w * h);
  const stack = [];

  for (let x = 0; x < w; x++) {
    stack.push([x, 0], [x, h - 1]);
  }
  for (let y = 0; y < h; y++) {
    stack.push([0, y], [w - 1, y]);
  }

  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    const idx = y * w + x;
    if (bg[idx]) continue;
    if (!isEdgeBlack(data, channels, w, x, y)) continue;
    bg[idx] = 1;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  return bg;
}

async function main() {
  const { data, info } = await sharp(SRC_DARK).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const isBg = floodBackground(data, width, height, channels);
  const out = Buffer.from(data);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (!isBg[idx]) continue;
      const o = idx * channels;
      out[o + 3] = 0;
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 8 })
    .png({ compressionLevel: 9, force: true })
    .toFile(OUT_LOCKUP);

  console.log("Saved (transparent bg)", OUT_LOCKUP);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
