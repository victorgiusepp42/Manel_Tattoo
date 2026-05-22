import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SRC = path.join(
  "C:",
  "Users",
  "victo",
  ".cursor",
  "projects",
  "c-Users-victo-projects-Manel-Tattoo",
  "assets",
  "c__Users_victo_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Captura_de_tela_2026-05-22_001211-84d31792-7cf3-4bb6-837a-2e9a79f57b7e.png",
);

const OUT = path.join(root, "public", "pointing-hand-icon.png");

const BG_LUM = 238;

function lumAt(data, channels, w, x, y) {
  const i = (y * w + x) * channels;
  return Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
}

/** Remove só o fundo branco conectado às bordas (preserva mão branca fechada pelo contorno). */
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
    if (lumAt(data, channels, w, x, y) < BG_LUM) continue;
    bg[idx] = 1;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  return bg;
}

async function main() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const isBg = floodBackground(data, width, height, channels);
  const out = Buffer.alloc(width * height * 4);

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const o = idx * 4;

      if (isBg[idx]) {
        out[o + 3] = 0;
        continue;
      }

      const lum = lumAt(data, channels, width, x, y);
      const ink = 255 - lum;

      if (ink < 12) {
        out[o + 3] = 0;
        continue;
      }

      /* Contorno preto, anéis cinza e preenchimento → branco com alpha proporcional */
      const alpha =
        lum > 220 ? 235 : lum > 180 ? Math.min(255, Math.round(ink * 1.35)) : Math.min(255, Math.round(ink * 1.15));

      out[o] = 255;
      out[o + 1] = 255;
      out[o + 2] = 255;
      out[o + 3] = alpha;

      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const pad = 6;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);
  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  const cropped = Buffer.alloc(cropW * cropH * 4);
  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const src = ((minY + y) * width + (minX + x)) * 4;
      const dst = (y * cropW + x) * 4;
      cropped[dst] = out[src];
      cropped[dst + 1] = out[src + 1];
      cropped[dst + 2] = out[src + 2];
      cropped[dst + 3] = out[src + 3];
    }
  }

  await sharp(cropped, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  console.log(`Saved ${OUT} (${cropW}x${cropH})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
