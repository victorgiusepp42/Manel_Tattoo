import { BRAND } from "../data/site";
import { SectionHeading } from "./SectionHeading";

export function Artist() {
  return (
    <section id="artista" className="section-panel py-16 md:py-20 section-enter">
      <div className="mx-auto max-w-3xl px-5">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber">
          Artista multifacetado
        </p>
        <SectionHeading line1="Um traço." line2="Vários mundos." className="mt-3" />
        <p className="mt-6 leading-relaxed text-muted">
          Old school colorido na veia, mas sem prender você num único estilo. Blackwork pesado,
          realismo que parece foto, fineline delicado e lettering que carrega
          frase de verdade.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          Não é catálogo de estúdio — é conversa, desenho na medida e entrega com técnica de quem
          vive disso.
        </p>

        <div id="sobre" className="mt-14 border-t border-white/10 pt-14 md:mt-16 md:pt-16">
          <figure className="about-photo mx-auto mb-6 max-w-[min(100%,320px)]">
            <img
              src={BRAND.aboutPhoto}
              alt="Manel tatuando em estúdio"
              width={640}
              height={640}
              className="aspect-square w-full rounded-[12px] object-cover"
              loading="lazy"
            />
          </figure>
          <SectionHeading line1="Sobre" line2="Manel" layout="inline" className="mb-3" />
          <p className="leading-relaxed text-muted">
            Tatuador com assinatura autoral — a ilustração que você vê no fundo do site é dele,
            2024. Trabalha com @{BRAND.studio} e monta semanas em cidades de todo o Brasil pra quem
            não pode ir até o estúdio.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Acredita que tattoo boa começa em conversa honesta: o que você quer sentir quando olhar
            pro espelho, não só o que está na moda.
          </p>
        </div>
      </div>
    </section>
  );
}
