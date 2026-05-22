import { BRAND } from "../data/site";
import { SectionHeading } from "./SectionHeading";

export function Artist() {
  return (
    <section id="artista" className="section-panel py-16 md:py-20 section-enter">
      <div className="mx-auto max-w-3xl px-5">
        <p className="text-[1.125rem] font-bold uppercase tracking-[0.25em] text-amber">
          Artista multifacetado
        </p>
        <SectionHeading line1="Um traço." line2="Vários mundos." className="mt-3" />
        <p className="mt-6 leading-relaxed text-muted">
          Cada projeto é pensado de forma única, respeitando a ideia do cliente e a personalidade que
          a tatuagem precisa carregar. Mais do que seguir um único padrão, a proposta é criar peças
          com presença, equilíbrio estético e originalidade.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
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
          <p className="leading-relaxed text-muted">
            Manel é tatuador em Catalão e desenvolve seus projetos transitando principalmente entre o
            old school e projetos personalizados construídos junto de cada cliente.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            A ilustração no fundo deste site é uma criação dele, produzida em 2024 — parte de um
            processo que mistura desenho, composição e identidade visual própria.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Atualmente atua no Hermanos Studio em Catalão - GO e também organiza temporadas em
            cidades de diferentes regiões do Brasil, atendendo pessoas que acompanham seu trabalho à
            distância.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Para Manel, tatuagem não começa na referência pronta nem na tendência do momento. Começa
            na conversa. Na ideia, na memória, na estética e principalmente na sensação que a pessoa
            quer carregar quando se olha no espelho.
          </p>
        </div>
      </div>
    </section>
  );
}
