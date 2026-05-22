/**
 * Logo com fundo transparente — remove preto das bordas e buracos das letras (O de TATTOO).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assetsDir =
  process.env.BRAND_ASSETS_DIR ??
  "C:/Users/victo/.cursor/projects/c-Users-victo-projects-Manel-Tattoo/assets";

const SRC_CANDIDATES = [
  path.join(
    assetsDir,
    "c__Users_victo_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_LOGO_MANEL_TATTOO_AMOSTRAS__2_-e0eeba53-03be-4719-8417-cbc0d57749ec.png",
  ),
  path.join(root, "public", "manel-brand-lockup.png"),
];

const OUT_LOCKUP = path.join(root, "public", "manel-brand-lockup.png");
const OUT_MARK = path.join(root, "public", "manel-brand-lockup-mark.png");
const OUT_TATTOO_MASK = path.join(root, "public", "manel-brand-tattoo-mask.png");

/** Faixa vertical só da palavra TATTOO (abaixo de MANEL). */
const TATTOO_TOP_RATIO = 0.775;

/** Preto de fundo conectado às bordas da imagem. */
const BG_MAX = 34;
/** Buracos fechados (não ligados à borda da imagem). */
const HOLE_MAX = 120;
const MAX_HOLE_AREA = 20_000;
/** Wordmark (MANEL / TATTOO) — percentagem superior da faixa inferior. */
const WORDMARK_TOP_RATIO = 0.62;
/** Escuro dentro de contorno claro (centros dos O e A). */
const COUNTER_MAX = 100;
const COUNTER_BRIGHT_NEIGHBORS = 10;

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

function isHoleBlack(data, channels, w, x, y) {
  const i = (y * w + x) * channels;
  const max = Math.max(data[i], data[i + 1], data[i + 2]);
  const min = Math.min(data[i], data[i + 1], data[i + 2]);
  return max <= HOLE_MAX && max - min < 22;
}

function isBrightLetter(data, channels, w, x, y) {
  const i = (y * w + x) * channels;
  if (data[i + 3] < 160) return false;
  return lumAt(data, channels, w, x, y) >= 165;
}

function clearPixel(out, idx, channels) {
  const o = idx * channels;
  out[o] = 0;
  out[o + 1] = 0;
  out[o + 2] = 0;
  out[o + 3] = 0;
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

/** Regiões escuras fechadas (ex.: furos que não ligam ao fundo por pixels muito escuros). */
function punchEnclosedHoles(data, w, h, channels, isBg, out) {
  const seen = new Uint8Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (seen[idx] || isBg[idx] || !isHoleBlack(data, channels, w, x, y)) continue;

      const stack = [[x, y]];
      const pixels = [];
      let touchesEdge = false;

      while (stack.length) {
        const [cx, cy] = stack.pop();
        if (cx < 0 || cy < 0 || cx >= w || cy >= h) continue;
        const cidx = cy * w + cx;
        if (seen[cidx] || isBg[cidx] || !isHoleBlack(data, channels, w, cx, cy)) continue;
        seen[cidx] = 1;
        pixels.push([cx, cy]);
        if (cx === 0 || cy === 0 || cx === w - 1 || cy === h - 1) touchesEdge = true;
        stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
      }

      if (touchesEdge || pixels.length > MAX_HOLE_AREA) continue;

      for (const [px, py] of pixels) {
        clearPixel(out, py * w + px, channels);
      }
    }
  }
}

/**
 * Centros dos O em TATTOO ligam ao fundo por trilhos escuros na textura;
 * após o flood ficam cinza opaco — remove escuro rodeado de branco na faixa do wordmark.
 */
function punchWordmarkCounters(data, w, h, channels, out) {
  const y0 = Math.floor(h * WORDMARK_TOP_RATIO);

  for (let y = y0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const i = idx * channels;
      const max = Math.max(data[i], data[i + 1], data[i + 2]);
      if (data[i + 3] < 200 || max > COUNTER_MAX) continue;

      let bright = 0;
      for (let dy = -5; dy <= 5; dy++) {
        for (let dx = -5; dx <= 5; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          if (isBrightLetter(data, channels, w, nx, ny)) bright++;
        }
      }

      if (bright >= COUNTER_BRIGHT_NEIGHBORS) {
        clearPixel(out, idx, channels);
      }
    }
  }
}

/** Zera RGB onde alpha = 0 (evita halo escuro em alguns browsers). */
function clearGhostRgb(out, w, h, channels) {
  for (let idx = 0; idx < w * h; idx++) {
    const o = idx * channels;
    if (out[o + 3] === 0) clearPixel(out, idx, channels);
  }
}

function exportTattooLayers(buffer, width, height, channels) {
  const tattooY0 = Math.floor(height * TATTOO_TOP_RATIO);
  const mark = Buffer.from(buffer);
  const mask = Buffer.alloc(width * height * channels);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const o = idx * channels;
      const a = buffer[o + 3];
      const lum = lumAt(buffer, channels, width, x, y);

      if (y >= tattooY0) {
        mark[o + 3] = 0;
        if (a > 128 && lum > 90) {
          mask[o] = 255;
          mask[o + 1] = 255;
          mask[o + 2] = 255;
          mask[o + 3] = 255;
        }
      }
    }
  }

  return { mark, mask, tattooY0 };
}

function resolveSource() {
  for (const candidate of SRC_CANDIDATES) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error("Nenhum ficheiro de origem encontrado para o lockup.");
}

async function main() {
  const src = resolveSource();
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const isBg = floodBackground(data, width, height, channels);
  const out = Buffer.from(data);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (!isBg[idx]) continue;
      clearPixel(out, idx, channels);
    }
  }

  punchEnclosedHoles(data, width, height, channels, isBg, out);
  punchWordmarkCounters(data, width, height, channels, out);
  clearGhostRgb(out, width, height, channels);

  const trimmed = await sharp(out, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 8 })
    .png({ compressionLevel: 9, force: true })
    .toBuffer();

  await fs.promises.writeFile(OUT_LOCKUP, trimmed);

  const trimmedMeta = await sharp(trimmed).raw().toBuffer({ resolveWithObject: true });
  const tw = trimmedMeta.info.width;
  const th = trimmedMeta.info.height;
  const tc = trimmedMeta.info.channels;
  const { mark, mask } = exportTattooLayers(trimmedMeta.data, tw, th, tc);

  await sharp(mark, { raw: { width: tw, height: th, channels: tc } })
    .png({ compressionLevel: 9, force: true })
    .toFile(OUT_MARK);

  await sharp(mask, { raw: { width: tw, height: th, channels: tc } })
    .png({ compressionLevel: 9, force: true })
    .toFile(OUT_TATTOO_MASK);

  console.log("Saved", OUT_LOCKUP, OUT_MARK, OUT_TATTOO_MASK, "from", src);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
