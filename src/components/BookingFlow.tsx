import { useState } from "react";
import {
  BRAND,
  CATEGORIES,
  REGIONS,
  dmQuoteMessage,
  instagramUrl,
} from "../data/site";
const SIZES = [
  "Pequeno (até 10 cm)",
  "Médio (10–20 cm)",
  "Grande (20 cm+)",
  "Projeto / manga / costas",
];

export function BookingFlow() {
  const [style, setStyle] = useState<(typeof CATEGORIES)[number]>(CATEGORIES[0]);
  const [size, setSize] = useState<string>(SIZES[0]);
  const [region, setRegion] = useState<string>(REGIONS[1].label);

  const dm = instagramUrl();

  return (
    <section id="atendimento" className="section-panel--lift py-20 section-enter">
      <section className="mx-auto max-w-3xl px-5">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-light">
            Como funciona
          </p>
          <h2 className="headline-heavy mt-3 text-4xl text-cream">Monte seu pedido</h2>
          <p className="mt-4 text-muted">
            Base em @{BRAND.studio} · semanas dedicadas em outras cidades. Escolha abaixo e chame no
            Instagram com tudo pronto.
          </p>
        </header>

        <form
          className="card-surface mt-10 space-y-6 p-6 md:p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-amber">
              Estilo
            </span>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as (typeof CATEGORIES)[number])}
              className="w-full min-h-[44px] rounded-lg border border-white/10 bg-bg px-4 py-3 text-cream outline-none focus:border-red-light/50"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-amber">
              Tamanho
            </span>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-white/10 bg-bg px-4 py-3 text-cream outline-none focus:border-red-light/50"
            >
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-amber">
              Região / cidade
            </span>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-white/10 bg-bg px-4 py-3 text-cream outline-none focus:border-red-light/50"
            >
              {REGIONS.filter((r) => r.id !== "all").map((r) => (
                <option key={r.id} value={r.label}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>

          <section className="rounded-lg border border-amber/20 bg-amber/5 p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-amber">Vagas este mês</p>
            <p className="headline-heavy mt-1 text-3xl text-cream">{BRAND.slotsThisMonth}</p>
            <p className="mt-1 text-sm text-muted">horários abertos — confirmados no Instagram</p>
          </section>

          <a
            href={`${dm}?text=${encodeURIComponent(dmQuoteMessage(style, size, region))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-instagram flex w-full min-h-[48px]"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Enviar pedido no Instagram
          </a>
        </form>
      </section>
    </section>
  );
}
