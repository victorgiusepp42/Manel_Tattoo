import { ARTIST_CONTENT, BRAND } from "../data/site";
import { SectionHeading } from "./SectionHeading";

export function Artist() {
  return (
    <section id="artista" className="section-panel py-16 md:py-20 section-enter">
      <div className="mx-auto max-w-3xl px-5">
        <p className="text-[1.1875rem] font-bold uppercase tracking-[0.25em] text-amber">
          {ARTIST_CONTENT.sectionTitle}
        </p>
        <SectionHeading
          line1={ARTIST_CONTENT.headingLine1}
          line2={ARTIST_CONTENT.headingLine2}
          className="mt-3"
        />
        <p className="artist-intro__text mt-6 leading-relaxed text-muted">
          {ARTIST_CONTENT.introParagraphs[0]}
        </p>
        <p className="artist-intro__text mt-4 leading-relaxed text-muted">
          {ARTIST_CONTENT.introParagraphs[1]}
        </p>

        <div id="sobre" className="mt-14 md:mt-16">
          <figure className="about-photo mx-auto mb-6 max-w-[min(100%,320px)]">
            <img
              src={BRAND.aboutPhoto}
              alt={ARTIST_CONTENT.aboutPhotoAlt}
              width={640}
              height={640}
              className="aspect-square w-full rounded-[12px] object-cover"
              loading="lazy"
            />
          </figure>
          <SectionHeading
            line1={ARTIST_CONTENT.aboutHeadingLine1}
            line2={ARTIST_CONTENT.aboutHeadingLine2}
            layout="inline"
            className="mb-3"
          />
          <p className="artist-bio__text leading-relaxed text-muted">
            {ARTIST_CONTENT.paragraphs[0]}
          </p>
          <p className="artist-bio__text mt-4 leading-relaxed text-muted">
            {ARTIST_CONTENT.paragraphs[1]}
          </p>
          <p className="artist-bio__text mt-4 leading-relaxed text-muted">
            {ARTIST_CONTENT.paragraphs[2]}
          </p>
          <p className="artist-bio__text mt-4 leading-relaxed text-muted">
            {ARTIST_CONTENT.paragraphs[3]}
          </p>
        </div>
      </div>
    </section>
  );
}
