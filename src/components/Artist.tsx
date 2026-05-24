import { BRAND } from "../data/site";
import { SectionHeading } from "./SectionHeading";

export function Artist() {
  return (
    <section id="artista" className="section-panel py-16 md:py-20 section-enter">
      <div className="mx-auto max-w-3xl px-5">
        <p className="text-[1.1875rem] font-bold uppercase tracking-[0.25em] text-amber">
          Artista multifacetado
        </p>
        <SectionHeading line1="Um traço." line2="Vários mundos." className="mt-3" />
        <p className="artist-intro__text mt-6 leading-relaxed text-muted">
          Cada projeto é pensado de forma única, respeitando a ideia do cliente e a personalidade que
          a tatuagem precisa carregar. Mais do que seguir um único padrão, a proposta é criar peças
          com presença, equilíbrio estético e originalidade.
        </p>
        <p className="artist-intro__text mt-4 leading-relaxed text-muted">
          Diferentes estilos conectados pela mesma essência: tatuagens feitas com intenção,
          personalidade e força visual.
        </p>

        <div id="sobre" className="mt-14 md:mt-16">
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
          <p className="artist-bio__text leading-relaxed text-muted">
            Manel Tattoo é um artista brasileiro que trabalha com tatuagem old school e projetos diversos
            com forte identidade visual. Seu trabalho mistura a estética clássica da tatuagem tradicional
            com referências da cultura brasileira, arte popular e elementos contemporâneos.
          </p>
          <p className="artist-bio__text mt-4 leading-relaxed text-muted">
            Cada tatuagem é construída buscando equilíbrio entre impacto visual, composição sólida e
            significado. Das peças mais tradicionais às criações personalizadas, seu estilo carrega linhas
            marcantes, contraste forte e desenhos pensados para envelhecer bem na pele.
          </p>
          <p className="artist-bio__text mt-4 leading-relaxed text-muted">
            Manel transforma ideias em tatuagens com personalidade. Peças que contam histórias, carregam
            memória e permanecem vivas com o tempo.
          </p>
          <p className="artist-bio__text mt-4 leading-relaxed text-muted">
            Seu trabalho vem conquistando espaço entre clientes que procuram autenticidade, originalidade
            e uma tatuagem feita pra durar.
          </p>
        </div>
      </div>
    </section>
  );
}
