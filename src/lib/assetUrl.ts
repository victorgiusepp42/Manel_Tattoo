/** Prefixa caminhos de `public/` com `import.meta.env.BASE_URL` (GitHub Pages: /Manel_Tattoo/). */
export function assetUrl(path: string): string {
  const clean = path.replace(/^\//, "");
  const base = import.meta.env.BASE_URL;
  return `${base}${clean}`;
}
