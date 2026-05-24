import { useEffect } from "react";

const cache = new Set<string>();

/** Pré-carrega URLs de imagem uma vez (cache global por sessão). */
export function preloadImages(urls: readonly string[]) {
  for (const url of urls) {
    if (!url || cache.has(url)) continue;
    cache.add(url);
    const img = new Image();
    img.src = url;
  }
}

/** Pré-carrega quando `enabled` (ex.: célula visível no viewport). */
export function usePreloadImages(urls: readonly string[], enabled = true) {
  useEffect(() => {
    if (!enabled || urls.length === 0) return;
    preloadImages(urls);
  }, [enabled, urls]);
}
