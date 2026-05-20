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
  "c__Users_victo_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Captura_de_tela_2026-05-20_123324-9249ff13-5529-4746-a20f-e6cb30ccc3dc.png",
);

const OUT = path.join(root, "public", "tattoo-machine-icon.png");

function rowStats(rgba, w, y) {
  let count = 0;
  let minX = w;
  let maxX = 0;
  for (let x = 0; x < w; x++) {
    const a = rgba[(y * w + x) * 4 + 3];
    if (a > 35) {
      count++;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
    }
  }
  return { count, span: count ? maxX - minX + 1 : 0, fill: count / w };
}

function clearRow(rgba, w, y) {
  for (let x = 0; x < w; x++) {
    const o = (y * w + x) * 4;
    rgba[o] = 0;
    rgba[o + 1] = 0;
    rgba[o + 2] = 0;
    rgba[o + 3] = 0;
  }
}

/** Remove traço horizontal isolado acima de um vão largo (artefato acima do corpo). */
function removeSegmentAboveGap(rgba, w, h) {
  let gapY = -1;
  let gapH = 0;

  for (let y = 0; y < h; y++) {
    const { count } = rowStats(rgba, w, y);
    if (count < w * 0.01) {
      if (gapY < 0) gapY = y;
      gapH++;
      continue;
    }

    if (gapH >= 10) {
      for (let yy = 0; yy < gapY + gapH; yy++) clearRow(rgba, w, yy);
      return;
    }

    gapY = -1;
    gapH = 0;
  }
}

/** Remove traços horizontais soltos no topo (artefato da conversão). */
function stripTopHairlines(rgba, w, h) {
  const maxScan = Math.min(h, Math.round(h * 0.28));

  for (let pass = 0; pass < 3; pass++) {
    let y = 0;
    while (y < maxScan) {
      const cur = rowStats(rgba, w, y);
      if (cur.count === 0) {
        y++;
        continue;
      }

      let below = 0;
      for (let dy = 1; dy <= 10 && y + dy < h; dy++) {
        below = Math.max(below, rowStats(rgba, w, y + dy).count);
      }

      let bandRows = 0;
      for (let dy = 0; dy < 8 && y + dy < h; dy++) {
        if (rowStats(rgba, w, y + dy).count > w * 0.03) bandRows++;
        else break;
      }

      const thinBand = bandRows <= 4;
      const wideStroke = cur.span > w * 0.12;
      const weakBelow = below < Math.max(cur.count * 1.5, w * 0.14);
      const strayLine = thinBand && wideStroke && weakBelow;
      const topSpeck =
        y < Math.round(h * 0.08) && cur.fill < 0.12 && cur.span > w * 0.08;

      if (strayLine || topSpeck) {
        for (let dy = 0; dy < bandRows; dy++) clearRow(rgba, w, y + dy);
        continue;
      }

      y++;
    }
  }
}

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

      if (inv < 28) {
        out[o + 3] = 0;
        continue;
      }

      const alpha = Math.min(255, Math.round(inv * 1.05));
      out[o] = 255;
      out[o + 1] = 255;
      out[o + 2] = 255;
      out[o + 3] = alpha;

      if (alpha > 40) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const padX = 8;
  const padY = 6;
  minX = Math.max(0, minX - padX);
  minY = Math.max(0, minY - padY);
  maxX = Math.min(width - 1, maxX + padX);
  maxY = Math.min(height - 1, maxY + padY);
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

  stripTopHairlines(cropped, cropW, cropH);
  removeSegmentAboveGap(cropped, cropW, cropH);

  // Recorta de novo após limpar o topo
  let cMinX = cropW;
  let cMinY = cropH;
  let cMaxX = 0;
  let cMaxY = 0;
  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      if (cropped[(y * cropW + x) * 4 + 3] > 40) {
        cMinX = Math.min(cMinX, x);
        cMinY = Math.min(cMinY, y);
        cMaxX = Math.max(cMaxX, x);
        cMaxY = Math.max(cMaxY, y);
      }
    }
  }

  const finalW = cMaxX - cMinX + 1;
  const finalH = cMaxY - cMinY + 1;
  const final = Buffer.alloc(finalW * finalH * 4);
  for (let y = 0; y < finalH; y++) {
    for (let x = 0; x < finalW; x++) {
      const src = ((cMinY + y) * cropW + (cMinX + x)) * 4;
      const dst = (y * finalW + x) * 4;
      final[dst] = cropped[src];
      final[dst + 1] = cropped[src + 1];
      final[dst + 2] = cropped[src + 2];
      final[dst + 3] = cropped[src + 3];
    }
  }

  await sharp(final, { raw: { width: finalW, height: finalH, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  console.log(`Saved ${OUT} (${finalW}x${finalH})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
