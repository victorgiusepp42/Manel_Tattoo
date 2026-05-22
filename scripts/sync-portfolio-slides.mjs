/**
 * Gera {n}-slide-1.png e {n}-slide-2.png para a grade 3×4 (exceto slot 7 com 3 slides).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const portfolioDir = path.join(root, "public", "portfolio");
const assetsDir =
  process.env.BRAND_ASSETS_DIR ??
  "C:/Users/victo/.cursor/projects/c-Users-victo-projects-Manel-Tattoo/assets";

const STEM_BY_INDEX = {
  1: "1_Old_School_Tradicional",
  2: "2_Realismo",
  3: "3_Old_School_Tradicional",
  4: "4_Lettering",
  5: "5_Old_School_Tradicional",
  6: "6_Realismo",
  8: "8_Old_School_Tradicional",
  9: "9_Old_School_Tradicional",
  10: "10_Floral",
  11: "11_Old_School_Tradicional4",
  12: "12_Realismo",
};

/** Segunda foto por posição (assets do utilizador). */
const SLIDE2_ASSET_SUFFIX = {
  1: "empty-window_images_1-23ef25c7-433e-4303-8562-75d5ad011480.png",
  2: "empty-window_images_2-9b1efbd1-31b5-4539-9eaf-dceb36a1d91d.png",
  3: "empty-window_images_3-98cb6368-42c7-47f0-8017-c412c4c4f5d8.png",
  4: "empty-window_images_4-c2f26287-beb4-4736-a470-1f100592ceb6.png",
  5: "empty-window_images_5-c8ed9f2d-6ac0-4532-8f4e-34fc870e51ff.png",
  6: "empty-window_images_6-be368a88-771d-4713-b405-db20fce54d46.png",
  8: "empty-window_images_8-fdb0c03a-394f-4b4e-b8ad-523b5102e45d.png",
  9: "empty-window_images_9-79047f2e-2873-4869-84bb-fedbb275bb36.png",
  10: "empty-window_images_10-080d0ddb-7871-460c-8384-e39f1466758f.png",
  11: "empty-window_images_11-de8f435f-c155-47ac-a4a5-de132ac03ca2.png",
  12: "empty-window_images_12-769d9fb9-d25e-4f2c-9495-41be52dc7ba6.png",
};

function findAsset(suffix) {
  const exact = path.join(assetsDir, `c__Users_victo_AppData_Roaming_Cursor_User_workspaceStorage_${suffix}`);
  if (fs.existsSync(exact)) return exact;
  const files = fs.readdirSync(assetsDir);
  const key = suffix.replace(/^empty-window_images_/, "");
  const hit = files.find((f) => f.includes(key));
  if (!hit) throw new Error(`Asset não encontrado: ${suffix}`);
  return path.join(assetsDir, hit);
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log("OK", path.basename(dest));
}

for (const [indexStr, stem] of Object.entries(STEM_BY_INDEX)) {
  const n = Number(indexStr);
  const slide1Src = path.join(portfolioDir, `${stem}.png`);
  const slide1Dest = path.join(portfolioDir, `${n}-slide-1.png`);
  if (!fs.existsSync(slide1Src)) throw new Error(`Falta ${stem}.png`);
  copyFile(slide1Src, slide1Dest);

  const slide2Src = findAsset(SLIDE2_ASSET_SUFFIX[n]);
  copyFile(slide2Src, path.join(portfolioDir, `${n}-slide-2.png`));
}

console.log("Slot 7 mantém 7-slide-1/2/3.png (sem alteração).");
