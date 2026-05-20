import { InstagramButton } from "./InstagramButton";

export function FinalCTA() {
  return (
    <section id="cta-final" className="section-panel py-24 section-enter">
      <section className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="headline-heavy text-5xl text-cream md:text-6xl">
          Pronto para
          <br />
          <span className="text-gradient-brand">transformar?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-muted">
          Manda referência, tamanho e cidade. Resposta pelo Instagram — direto, sem enrolação.
        </p>
        <InstagramButton className="mt-10 min-h-[48px]">Chamar no Instagram</InstagramButton>
      </section>
    </section>
  );
}
