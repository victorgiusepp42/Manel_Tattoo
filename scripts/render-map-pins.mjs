import sharp from "sharp";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "public/brazil-map.svg");

// Render SVG to PNG for pixel analysis
const png = await sharp(svgPath, { density: 150 })
  .png()
  .toBuffer({ resolveWithObject: true });

const { data, info } = png;
console.log("rendered", info.width, info.height);

function findStateCentroid(targetRgb) {
  const pts = [];
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < 20) continue;
      if (
        Math.abs(r - targetRgb[0]) < 15 &&
        Math.abs(g - targetRgb[1]) < 15 &&
        Math.abs(b - targetRgb[2]) < 15
      ) {
        pts.push({ x, y });
      }
    }
  }
  if (!pts.length) return null;
  const sx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  const sy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
  return { x: sx, y: sy, count: pts.length };
}

// Map fill is rgba(255,255,255,0.07) on transparent - very dark gray when composited
// Find any non-transparent pixels bbox
let minX = Infinity,
  minY = Infinity,
  maxX = 0,
  maxY = 0;
const opaque = [];
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    if (data[i + 3] > 20) {
      opaque.push({ x, y });
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log("opaque bbox", { minX, minY, maxX, maxY });

// Sample known cities manually on rendered map by coloring states uniquely - skip
// Use geographic projection on rendered bbox
const VIEWBOX = { w: 613, h: 639 };
const cities = {
  sp: { lat: -23.5505, lng: -46.6333 },
  rj: { lat: -22.9068, lng: -43.1729 },
  goiania: { lat: -16.6869, lng: -49.2648 },
  brasilia: { lat: -15.7975, lng: -47.8919 },
};
const B = { north: 5.2, south: -33.75, west: -73.99, east: -34.79 };

for (const [k, c] of Object.entries(cities)) {
  const vx =
    ((c.lng - B.west) / (B.east - B.west)) * VIEWBOX.w;
  const vy =
    ((B.north - c.lat) / (B.north - B.south)) * VIEWBOX.h;
  const px = minX + (vx / VIEWBOX.w) * (maxX - minX);
  const py = minY + (vy / VIEWBOX.h) * (maxY - minY);
  console.log(k, "viewBox", Math.round(vx), Math.round(vy), "render px", Math.round(px), Math.round(py));
}

// Manual visual calibration based on state positions on this SVG
const manual = {
  sp: { x: 430, y: 478 },
  rj: { x: 478, y: 448 },
  goiania: { x: 378, y: 328 },
  brasilia: { x: 408, y: 318 },
};
console.log("manual", manual);
