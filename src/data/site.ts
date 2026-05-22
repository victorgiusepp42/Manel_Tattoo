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
  heroArt: assetUrl("manel-hero-2024.png"),
  ogImage: assetUrl("manel-hero-2024.png"),
  aboutPhoto: assetUrl("about/manel-at-work.png"),
  whatsapp: "5564993252550",
  slotsThisMonth: 3,
} as const;

export const PORTFOLIO_PHOTOS = [
  assetUrl("portfolio/portfolio-1.jpg"),
  assetUrl("portfolio/portfolio-2.jpg"),
  assetUrl("portfolio/portfolio-3.jpg"),
] as const;

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

function slideFromStem(fileStem: string, caption: string): GallerySlide {
  return {
    image: assetUrl(`portfolio/${fileStem}.png`),
    alt: caption,
  };
}

const PORTFOLIO_SLOT_7_SLIDES: readonly GallerySlide[] = [
  { image: assetUrl("portfolio/7-slide-1.png"), alt: "Old School" },
  { image: assetUrl("portfolio/7-slide-2.png"), alt: "Old School" },
  { image: assetUrl("portfolio/7-slide-3.png"), alt: "Old School" },
] as const;

type GalleryMeta = {
  index: number;
  style: string;
  filterStyle: (typeof CATEGORIES)[number];
  slides?: readonly GallerySlide[];
  /** Gera um slide a partir de `public/portfolio/{fileStem}.png` */
  fileStem?: string;
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
  { index: 1, fileStem: "1_Old_School_Tradicional", style: "Old School", filterStyle: "Old School" },
  { index: 2, fileStem: "2_Realismo", style: "Realismo", filterStyle: "Realismo" },
  { index: 3, fileStem: "3_Old_School_Tradicional", style: "Old School", filterStyle: "Old School" },
  { index: 4, fileStem: "4_Lettering", style: "Lettering", filterStyle: "Lettering" },
  { index: 5, fileStem: "5_Old_School_Tradicional", style: "Old School", filterStyle: "Old School" },
  { index: 6, fileStem: "6_Realismo", style: "Realismo", filterStyle: "Realismo" },
  { index: 7, style: "Old School", filterStyle: "Old School", slides: PORTFOLIO_SLOT_7_SLIDES },
  { index: 8, fileStem: "8_Old_School_Tradicional", style: "Old School", filterStyle: "Old School" },
  { index: 9, fileStem: "9_Old_School_Tradicional", style: "Old School", filterStyle: "Old School" },
  { index: 10, fileStem: "10_Floral", style: "Floral", filterStyle: "Fineline" },
  { index: 11, fileStem: "11_Old_School_Tradicional4", style: "Old School", filterStyle: "Old School" },
  { index: 12, fileStem: "12_Realismo", style: "Realismo", filterStyle: "Realismo" },
];

function metaToGalleryPhoto(m: GalleryMeta): GalleryPhoto {
  const slides: readonly GallerySlide[] = m.missing
    ? []
    : m.slides ?? (m.fileStem ? [slideFromStem(m.fileStem, m.style)] : []);

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

export const REGIONS = [
  { id: "all", label: "Todo o Brasil" },
  { id: "co", label: "Centro-Oeste" },
  { id: "se", label: "Sudeste" },
  { id: "s", label: "Sul" },
  { id: "ne", label: "Nordeste" },
  { id: "n", label: "Norte" },
] as const;

export type RegionId = (typeof REGIONS)[number]["id"];

export type PortfolioItem = {
  id: string;
  style: (typeof CATEGORIES)[number];
  region: RegionId;
  title: string;
  image: string;
  imageFocus?: string;
  beforeAfter?: boolean;
};

const PORTFOLIO_META: Omit<PortfolioItem, "image" | "imageFocus">[] = [
  { id: "os1", style: "Old School", region: "co", title: "Pantera old school" },
  { id: "os2", style: "Old School", region: "se", title: "Rosa tradicional" },
  { id: "os3", style: "Old School", region: "s", title: "Dagger & banner" },
  { id: "bw1", style: "Blackwork", region: "co", title: "Mandala blackwork" },
  { id: "bw2", style: "Blackwork", region: "se", title: "Serpente sólida" },
  { id: "re1", style: "Realismo", region: "co", title: "Retrato", beforeAfter: true },
  { id: "re2", style: "Realismo", region: "ne", title: "Felino" },
  { id: "fl1", style: "Fineline", region: "s", title: "Linha fina botânica" },
  { id: "lt1", style: "Lettering", region: "co", title: "Script personalizado" },
];

const FOCUSES = [
  "12% 18%",
  "38% 22%",
  "68% 20%",
  "82% 45%",
  "15% 52%",
  "45% 55%",
  "72% 58%",
  "25% 78%",
  "55% 75%",
  "78% 82%",
];

export const PORTFOLIO: PortfolioItem[] = PORTFOLIO_META.map((item, i) => ({
  ...item,
  image: PORTFOLIO_PHOTOS[i % PORTFOLIO_PHOTOS.length]!,
  imageFocus: FOCUSES[i % FOCUSES.length],
}));

export const STYLE_FILTERS = ["Todos", ...CATEGORIES] as const;
export type StyleFilter = (typeof STYLE_FILTERS)[number];

export const NEXT_CITIES = [
  { city: "Goiânia", state: "GO", period: "Jun 2026", status: "confirmado" as const },
  { city: "Brasília", state: "DF", period: "Jul 2026", status: "em breve" as const },
  { city: "Belo Horizonte", state: "MG", period: "A definir", status: "votacao" as const },
  { city: "São Paulo", state: "SP", period: "A definir", status: "votacao" as const },
];

export type TripStatus = "confirmado" | "em breve" | "votacao";

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
