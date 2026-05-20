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
  "c__Users_victo_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_pngegg-7f439da1-ca50-47cd-a21b-22dfe71d9d39.png",
);

const OUT = path.join(root, "public", "shuriken-icon.png");

async function main() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const lum = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
      const inv = 255 - lum;
      const o = (y * width + x) * 4;

      if (inv < 24) {
        out[o + 3] = 0;
        continue;
      }

      const alpha = Math.min(255, Math.round(inv * 1.05));
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

  const pad = 4;
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
