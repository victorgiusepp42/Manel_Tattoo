import { TESTIMONIALS } from "../data/site";

export function Testimonials() {
  return (
    <section id="depoimentos" className="section-panel py-20 section-enter">
      <section className="mx-auto max-w-6xl px-5">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-light">
            Depoimentos
          </p>
          <h2 className="display-title mt-3 text-4xl text-cream">Quem tatuou, conta</h2>
        </header>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li
              key={t.name}
              className="rounded-xl border border-red/15 bg-bg-muted/70 p-6"
            >
              <section className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-red/20 text-sm font-bold text-red-light"
                  aria-hidden
                >
                  {t.name.charAt(0)}
                </span>
                <section>
                  <p className="font-bold text-cream">{t.name}</p>
                  <p className="text-xs text-muted">{t.city}</p>
                </section>
              </section>
              <p className="text-sm italic leading-relaxed text-cream/90">
                &ldquo;{t.text}&rdquo;
              </p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
