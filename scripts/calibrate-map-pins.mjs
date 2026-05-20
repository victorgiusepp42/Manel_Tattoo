import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = fs.readFileSync(join(root, "public/brazil-map.svg"), "utf8");

function parsePath(d) {
  const nums = [];
  const re = /[-+]?(?:\d+\.\d+|\.\d+|\d+)(?:[eE][-+]?\d+)?/g;
  let m;
  while ((m = re.exec(d))) nums.push(parseFloat(m[0]));
  return nums;
}

function bboxFromPath(d) {
  const nums = parsePath(d);
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i + 1];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
}

function bboxForId(id) {
  const re = new RegExp(`id="${id}"[\\s\\S]*?d="([^"]+)"`);
  const m = svg.match(re);
  return m ? bboxFromPath(m[1]) : null;
}

const paths = [...svg.matchAll(/d="([^"]+)"/g)].map((m) => m[1]);
let map = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
for (const d of paths) {
  const b = bboxFromPath(d);
  map.minX = Math.min(map.minX, b.minX);
  map.minY = Math.min(map.minY, b.minY);
  map.maxX = Math.max(map.maxX, b.maxX);
  map.maxY = Math.max(map.maxY, b.maxY);
}

console.log("map bbox", map);
for (const id of ["sp", "rj", "go", "df"]) {
  console.log(id, bboxForId(id));
}

const cities = {
  sp: { lat: -23.5505, lng: -46.6333 },
  rj: { lat: -22.9068, lng: -43.1729 },
  goiania: { lat: -16.6869, lng: -49.2648 },
  brasilia: { lat: -15.7975, lng: -47.8919 },
};

// @svg-maps/brazil approximate bounds
const bounds = { north: 5.2, south: -33.75, west: -73.99, east: -34.79 };

for (const [k, c] of Object.entries(cities)) {
  const x = map.minX + ((c.lng - bounds.west) / (bounds.east - bounds.west)) * (map.maxX - map.minX);
  const y = map.minY + ((bounds.north - c.lat) / (bounds.north - bounds.south)) * (map.maxY - map.minY);
  console.log("geo", k, Math.round(x * 10) / 10, Math.round(y * 10) / 10);
}

// City tweaks relative to state bbox (SP/RJ not at centroid)
const tweaks = {
  sp: { x: 0.62, y: 0.38 }, // inland NW within SP
  rj: { x: 0.55, y: 0.42 }, // coast
  goiania: { x: 0.42, y: 0.52 },
  brasilia: { x: 0.5, y: 0.5 }, // DF is tiny, use center
};

for (const [id, t] of Object.entries(tweaks)) {
  const sid = id === "goiania" ? "go" : id === "brasilia" ? "df" : id;
  const b = bboxForId(sid);
  if (!b) continue;
  const x = b.minX + (b.maxX - b.minX) * t.x;
  const y = b.minY + (b.maxY - b.minY) * t.y;
  console.log("state", id, Math.round(x), Math.round(y));
}
