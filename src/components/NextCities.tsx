import { NEXT_CITIES, instagramUrl } from "../data/site";

const statusLabel = {
  confirmado: "Confirmado",
  "em breve": "Em breve",
  votacao: "Vote aqui",
} as const;

export function NextCities() {
  return (
    <section id="cidades" className="section-panel--lift py-20 section-enter">
      <section className="mx-auto max-w-6xl px-5">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-light">
            Diferencial
          </p>
          <h2 className="headline-heavy mt-3 text-4xl text-cream md:text-5xl">
            Próximas cidades
          </h2>
          <p className="mt-4 text-muted">
            Semana inteira na sua região — você não precisa viajar até o estúdio. A arte vai até
            você.
          </p>
        </header>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {NEXT_CITIES.map((c) => (
            <li key={c.city} className="card-surface p-6">
              <h3 className="headline-heavy text-2xl text-cream">
                {c.city}
                <span className="text-red-light">, {c.state}</span>
              </h3>
              <p className="mt-1 text-sm text-muted">{c.period}</p>
              <span className="mt-3 inline-block pill">{statusLabel[c.status]}</span>
              <a
                href={instagramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-4 flex min-h-[44px] w-full sm:w-fit"
              >
                Quero que você venha aqui
              </a>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
