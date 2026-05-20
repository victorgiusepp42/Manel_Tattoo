export const BRAND = {
  name: "Manel Tattoo",
  tagline: "Transforme o que você sente em algo que você vê.",
  instagram: "maneltattoo_",
  studio: "hermanoss.studio",
  logo: "/manel-logo-clean.png",
  heroArt: "/manel-hero-2024.png",
  ogImage: "/manel-hero-2024.png",
  whatsapp: "5564993252550",
  slotsThisMonth: 3,
} as const;

export const PORTFOLIO_PHOTOS = [
  "/portfolio/portfolio-1.jpg",
  "/portfolio/portfolio-2.jpg",
  "/portfolio/portfolio-3.jpg",
] as const;

export const REGIONS = [
  { id: "all", label: "Todo o Brasil" },
  { id: "co", label: "Centro-Oeste" },
  { id: "se", label: "Sudeste" },
  { id: "s", label: "Sul" },
  { id: "ne", label: "Nordeste" },
  { id: "n", label: "Norte" },
] as const;

export type RegionId = (typeof REGIONS)[number]["id"];

export const CATEGORIES = [
  "Old School",
  "Blackwork",
  "Realismo",
  "Neotraditional",
  "Fineline",
  "Lettering",
] as const;

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
  { id: "nt1", style: "Neotraditional", region: "se", title: "Floral neotrad" },
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
  "Old School · Blackwork · Realismo · Neotrad · Fineline · Lettering",
  "@maneltattoo_",
  "Tatuagem autoral · @hermanoss.studio",
];

export function instagramUrl(_text?: string) {
  return `https://ig.me/m/${BRAND.instagram}`;
}

export function whatsappUrl(text: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function dmQuoteMessage(style: string, size: string, region: string) {
  return `Oi Manel! Vi o site e quero orçamento.\nEstilo: ${style}\nTamanho: ${size}\nRegião: ${region}`;
}
