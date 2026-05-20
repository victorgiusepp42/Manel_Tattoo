import sharp from "sharp";

const ref =
  "C:/Users/victo/.cursor/projects/c-Users-victo-projects-Manel-Tattoo/assets/c__Users_victo_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Captura_de_tela_2026-05-20_052826-2dc142ee-1038-443a-bed6-30e963a66eab.png";

const VIEWBOX = { w: 613, h: 639 };

const { data, info } = await sharp(ref).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function kmeans(points, k, maxIter = 30) {
  if (points.length < k) return points.map((p) => ({ ...p, count: 1 }));
  let centroids = points.slice(0, k).map((p) => ({ x: p.x, y: p.y }));
  for (let iter = 0; iter < maxIter; iter++) {
    const groups = Array.from({ length: k }, () => []);
    for (const p of points) {
      let best = 0;
      let bestD = Infinity;
      for (let i = 0; i < k; i++) {
        const d = dist(p, centroids[i]);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      groups[best].push(p);
    }
    let moved = false;
    for (let i = 0; i < k; i++) {
      if (!groups[i].length) continue;
      const nx = groups[i].reduce((s, p) => s + p.x, 0) / groups[i].length;
      const ny = groups[i].reduce((s, p) => s + p.y, 0) / groups[i].length;
      if (Math.abs(nx - centroids[i].x) > 0.5 || Math.abs(ny - centroids[i].y) > 0.5) moved = true;
      centroids[i] = { x: nx, y: ny, count: groups[i].length };
    }
    if (!moved) break;
  }
  return centroids;
}

const land = [];
const blue = [];
const yellow = [];

for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const isMapFill = r > 8 && r < 95 && g > 8 && g < 95 && b > 8 && b < 95;
    const isMapStroke = r > 70 && r < 130 && g > 70 && g < 130 && b > 70 && b < 130;
    if (isMapFill || isMapStroke) land.push({ x, y });

    if (b > 150 && g > 100 && r < 140) blue.push({ x, y });
    if (r > 200 && g > 170 && b < 130) yellow.push({ x, y });
  }
}

let minX = Infinity,
  minY = Infinity,
  maxX = 0,
  maxY = 0;
for (const p of land) {
  if (p.x < minX) minX = p.x;
  if (p.x > maxX) maxX = p.x;
  if (p.y < minY) minY = p.y;
  if (p.y > maxY) maxY = p.y;
}

// Ignore legend area (bottom ~12% of map bbox)
const mapH = maxY - minY;
const pinAreaMaxY = minY + mapH * 0.88;

const bluePins = blue.filter((p) => p.y < pinAreaMaxY && p.x >= minX && p.x <= maxX);
const yellowPins = yellow.filter((p) => p.y < pinAreaMaxY && p.x >= minX && p.x <= maxX);

const blueC = kmeans(bluePins, 1)[0];
const yellowC = kmeans(yellowPins, 3).sort((a, b) => a.y - b.y || a.x - b.x);

function toVB(p) {
  return {
    x: Math.round(((p.x - minX) / (maxX - minX)) * VIEWBOX.w),
    y: Math.round(((p.y - minY) / (maxY - minY)) * VIEWBOX.h),
  };
}

console.log("map px bbox", { minX, minY, maxX, maxY, w: info.width, h: info.height });
console.log("blue", blueC && toVB(blueC));
console.log(
  "yellow sorted N->S",
  yellowC.map((c, i) => ({ i, vb: toVB(c), count: c.count })),
);

// Assign by geography: northern pair = DF/GO, southern pair = SP/RJ
const north = yellowC.slice(0, 2).sort((a, b) => a.x - b.x);
const south = yellowC.slice(2).concat(yellowC.length > 2 ? [] : []).sort((a, b) => a.x - b.x);

const goiania = north[0];
const brasilia = north[1];
const spFromBlue = blueC;
const rj = yellowC.find((c) => c.y > (north[1]?.y ?? 0) + 20) || yellowC[2];

console.log("assigned", {
  brasilia: brasilia && toVB(brasilia),
  goiania: goiania && toVB(goiania),
  sp: spFromBlue && toVB(spFromBlue),
  rj: rj && toVB(rj),
});
