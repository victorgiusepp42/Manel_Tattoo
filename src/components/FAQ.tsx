import { FAQ_ITEMS } from "../data/site";

export function FAQ() {
  return (
    <section id="faq" className="section-panel--lift py-20 section-enter">
      <section className="mx-auto max-w-2xl px-5">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-light">FAQ</p>
          <h2 className="display-title mt-3 text-4xl text-cream">Dúvidas diretas</h2>
        </header>
        <section className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="faq-item rounded-xl border border-red/15 bg-bg-muted/50 px-5 py-4">
              <summary className="font-bold uppercase tracking-wide text-cream">
                {item.q}
              </summary>
              <p className="mt-3 text-sm text-muted leading-relaxed">{item.a}</p>
            </details>
          ))}
        </section>
      </section>
    </section>
  );
}
