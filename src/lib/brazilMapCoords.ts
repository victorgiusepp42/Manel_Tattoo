/** Posições calibradas no viewBox do `public/brazil-map.svg` (613×639). */
export const MAP_VIEWBOX = { w: 613, h: 639 } as const;

/**
 * Pins alinhados à silhueta do SVG (@svg-maps/brazil):
 * - DF/RJ/SP ancorados nos paths dos estados
 * - Goiânia a sudoeste de Brasília, dentro de GO
 */
export const MAP_PINS = {
  sp: { x: 435, y: 458 },
  rj: { x: 488, y: 442 },
  catalao: { x: 402, y: 366 },
  uberlandia: { x: 402, y: 384 },
  goiania: { x: 372, y: 335 },
  brasilia: { x: 412, y: 332 },
} as const;

export type MapPinCity = keyof typeof MAP_PINS;

export function tripMapPin(city: MapPinCity) {
  return MAP_PINS[city];
}

export function tripMapPinPercent(city: MapPinCity) {
  const { x, y } = MAP_PINS[city];
  return {
    x: (x / MAP_VIEWBOX.w) * 100,
    y: (y / MAP_VIEWBOX.h) * 100,
  };
}
