import { assetUrl } from "../lib/assetUrl";
import { tripMapPin, type MapPinCity } from "../lib/brazilMapCoords";

function mapPin(city: MapPinCity) {
  const p = tripMapPin(city);
  return { mapX: p.x, mapY: p.y };
}

export const BRAND = {
  name: "Manel Tattoo",
  tagline: "Transforme o que você sente em algo que você vê.",
  instagram: "maneltattoo_",
  studio: "hermanoss.studio",
  logo: assetUrl("manel-logo-clean.png"),
  wordmark: assetUrl("manel-brand-wordmark.png"),
  brandLockup: assetUrl("manel-brand-lockup.png"),
  brandLockupMark: assetUrl("manel-brand-lockup-mark.png"),
  brandTattooMask: assetUrl("manel-brand-tattoo-mask.png"),
  heroArt: assetUrl("manel-hero-2024.png"),
  ogImage: assetUrl("manel-hero-2024.png"),
  aboutPhoto: assetUrl("about/manel-at-work.png"),
  whatsapp: "5564993252550",
  slotsThisMonth: 3,
} as const;

export const CATEGORIES = [
  "Old School",
  "Blackwork",
  "Realismo",
  "Fineline",
  "Lettering",
] as const;

export type GallerySlide = {
  image: string;
  alt: string;
};

export type GalleryPhoto = {
  index: number;
  id: string;
  image: string;
  alt: string;
  /** Legenda abaixo da foto */
  style: string;
  /** Estilo usado pelas pills de filtro */
  filterStyle: (typeof CATEGORIES)[number];
  missing?: boolean;
  /** Slides do carrossel (sempre presente quando não está `missing`) */
  slides: readonly GallerySlide[];
  /** Post/reel no Instagram deste slot. */
  instagramUrl?: string;
};

function slideAt(index: number, slide: 1 | 2, caption: string): GallerySlide {
  return {
    image: assetUrl(`portfolio/${index}-slide-${slide}.png`),
    alt: caption,
  };
}

function dualSlides(index: number, caption: string): readonly GallerySlide[] {
  return [slideAt(index, 1, caption), slideAt(index, 2, caption)] as const;
}

const PORTFOLIO_SLOT_7_SLIDES: readonly GallerySlide[] = [
  { image: assetUrl("portfolio/7-slide-1.png"), alt: "Old School" },
  { image: assetUrl("portfolio/7-slide-3.png"), alt: "Old School" },
] as const;

type GalleryMeta = {
  index: number;
  style: string;
  filterStyle: (typeof CATEGORIES)[number];
  slides: readonly GallerySlide[];
  missing?: boolean;
};

const PORTFOLIO_INSTAGRAM_URLS: Record<number, string | undefined> = {
  1: "https://www.instagram.com/p/DQt7RKRjSNk/",
  2: "https://www.instagram.com/p/DTn-joTD2vF/",
  3: "https://www.instagram.com/p/DTtT6KfD0Iy/",
  4: "https://www.instagram.com/reel/DKaY1loShgj/",
  6: "https://www.instagram.com/p/DMbgEAINfZ3/",
  7: "https://www.instagram.com/reel/DLDrmH_ynB2/",
  9: "https://www.instagram.com/p/C9f9dSDSq3n/",
  10: "https://www.instagram.com/p/DKNsiSiSdyc/",
  11: "https://www.instagram.com/reel/DNgFA9AN5BC/",
  12: "https://www.instagram.com/reel/DX-EYwDPRIJ/",
};

const PORTFOLIO_GALLERY_META: GalleryMeta[] = [
  { index: 1, style: "Old School", filterStyle: "Old School", slides: dualSlides(1, "Old School") },
  { index: 2, style: "Realismo", filterStyle: "Realismo", slides: dualSlides(2, "Realismo") },
  { index: 3, style: "Old School", filterStyle: "Old School", slides: dualSlides(3, "Old School") },
  { index: 4, style: "Lettering", filterStyle: "Lettering", slides: dualSlides(4, "Lettering") },
  { index: 5, style: "Old School", filterStyle: "Old School", slides: dualSlides(5, "Old School") },
  { index: 6, style: "Realismo", filterStyle: "Realismo", slides: dualSlides(6, "Realismo") },
  { index: 7, style: "Old School", filterStyle: "Old School", slides: PORTFOLIO_SLOT_7_SLIDES },
  { index: 8, style: "Old School", filterStyle: "Old School", slides: dualSlides(8, "Old School") },
  { index: 9, style: "Old School", filterStyle: "Old School", slides: dualSlides(9, "Old School") },
  { index: 10, style: "Floral", filterStyle: "Fineline", slides: dualSlides(10, "Floral") },
  { index: 11, style: "Old School", filterStyle: "Old School", slides: dualSlides(11, "Old School") },
  { index: 12, style: "Realismo", filterStyle: "Realismo", slides: dualSlides(12, "Realismo") },
];

function metaToGalleryPhoto(m: GalleryMeta): GalleryPhoto {
  const slides: readonly GallerySlide[] = m.missing ? [] : m.slides;

  const first = slides[0];

  return {
    index: m.index,
    id: `gallery-${m.index}`,
    image: first?.image ?? "",
    alt: m.style,
    style: m.style,
    filterStyle: m.filterStyle,
    missing: m.missing,
    slides,
    instagramUrl: PORTFOLIO_INSTAGRAM_URLS[m.index],
  };
}

export const PORTFOLIO_GALLERY: GalleryPhoto[] = PORTFOLIO_GALLERY_META.map(metaToGalleryPhoto);

export type TripStatus = "confirmado" | "em breve" | "votacao";

/** Tom do pin no mapa (e accent nos cards). */
export type TripPinTone = "verde" | "confirmado" | "em-breve" | "votacao";

export function tripPinTone(trip: { id: string; status: TripStatus }): TripPinTone {
  if (trip.id === "catalao") return "verde";
  if (trip.status === "confirmado") return "confirmado";
  if (trip.status === "votacao") return "votacao";
  return "em-breve";
}

export type UpcomingTrip = {
  id: string;
  city: string;
  state: string;
  /** Intervalo da semana de viagem (ISO). Opcional quando datas a definir. */
  startDate?: string;
  endDate?: string;
  period: string;
  status: TripStatus;
  /** Pin no viewBox do mapa SVG (613×639). */
  mapX: number;
  mapY: number;
};

export const UPCOMING_TRIPS: UpcomingTrip[] = [
  {
    id: "catalao",
    city: "Catalão",
    state: "GO",
    period: "",
    status: "em breve",
    ...mapPin("catalao"),
  },
  {
    id: "sp",
    city: "São Paulo",
    state: "SP",
    startDate: "2026-05-25",
    endDate: "2026-05-29",
    period: "25/05 a 29/05",
    status: "confirmado",
    ...mapPin("sp"),
  },
  {
    id: "rj",
    city: "Rio de Janeiro",
    state: "RJ",
    startDate: "2026-06-03",
    endDate: "2026-06-15",
    period: "03/06 a 15/06",
    status: "confirmado",
    ...mapPin("rj"),
  },
  {
    id: "uberlandia",
    city: "Uberlândia",
    state: "MG",
    period: "",
    status: "em breve",
    ...mapPin("uberlandia"),
  },
  {
    id: "goiania",
    city: "Goiânia",
    state: "GO",
    period: "",
    status: "em breve",
    ...mapPin("goiania"),
  },
  {
    id: "brasilia",
    city: "Brasília",
    state: "DF",
    period: "",
    status: "em breve",
    ...mapPin("brasilia"),
  },
];

export const FAQ_ITEMS = [
  {
    q: "Quanto tempo leva para cicatrizar?",
    a: "Depende do tamanho e do local. Em geral, a fase mais sensível dura 2 a 3 semanas; a cicatrização completa pode levar até 60 dias. Mando as orientações certinho no pós.",
  },
  {
    q: "Como é a sessão?",
    a: "A gente alinha referência, tamanho e local antes. No dia, preparo o desenho, você aprova e a gente executa com calma — sem pressa de fábrica.",
  },
  {
    q: "Vocês fazem cover-up?",
    a: "Sim, quando o projeto permite. Manda foto do que tem hoje e da ideia nova pelo DM que eu digo se dá e qual o caminho.",
  },
  {
    q: "Como agendar em outra cidade?",
    a: "Pelas semanas itinerantes: você reserva vaga na cidade, paga o sinal combinado e a gente fecha data e horário. Tudo começa no DM.",
  },
];

export const TESTIMONIALS = [
  { name: "Ana R.", city: "Goiânia, GO", text: "Fui na semana que ele veio pra cá. Saí com a peça que tava na cabeça há anos.", photo: null },
  { name: "Lucas M.", city: "Brasília, DF", text: "Traço firme, conversa boa e zero clima de pressa. Já tô planejando a próxima.", photo: null },
  { name: "Juliana P.", city: "Catalão, GO", text: "Old school colorido do jeito que eu queria. O antes/depois do cover falou por si.", photo: null },
];

export const TICKER_PHRASES = [
  "Manel Tattoo",
  "Semanas em cidades do Brasil",
  "Chama no Instagram",
  "Old School · Blackwork · Realismo · Fineline · Lettering",
  "@maneltattoo_",
  "Tatuagem autoral · @hermanoss.studio",
];

export function instagramUrl(_text?: string) {
  return `https://ig.me/m/${BRAND.instagram}`;
}

export function whatsappUrl(text: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function tripAgendarMessage(city: string, state: string, period?: string) {
  const dates = period?.trim() ? `\nPeríodo: ${period}` : "";
  return `Oi! Vi o site da Manel Tattoo e quero agendar em ${city} - ${state}.${dates}`;
}

export function dmQuoteMessage(style: string, size: string, region: string) {
  return `Oi Manel! Vi o site e quero orçamento.\nEstilo: ${style}\nTamanho: ${size}\nRegião: ${region}`;
}
