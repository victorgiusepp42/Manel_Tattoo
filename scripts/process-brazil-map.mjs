import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const input = join(root, "public/brazil-map-source.png");
const output = join(root, "public/brazil-map.png");

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * info.channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const avg = (r + g + b) / 3;

    const isBg =
      avg > 175 ||
      (r > 160 && g > 160 && b > 160 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20);

    const inWatermark =
      (x < width * 0.13 && y < height * 0.13) ||
      (x < width * 0.3 && y > height * 0.84);

    if (isBg || inWatermark) {
      data[i + 3] = 0;
    } else {
      data[i] = Math.min(255, r + 18);
      data[i + 1] = Math.min(255, g + 18);
      data[i + 2] = Math.min(255, b + 22);
      data[i + 3] = Math.round(data[i + 3] * 0.72);
    }
  }
}

await sharp(data, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(output);

const meta = await sharp(output).metadata();
console.log("Wrote", output, meta.width, "x", meta.height);
