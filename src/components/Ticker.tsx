import { TICKER_PHRASES } from "../data/site";

const track = [...TICKER_PHRASES, ...TICKER_PHRASES, ...TICKER_PHRASES, ...TICKER_PHRASES];

export function Ticker() {
  return (
    <section className="ticker" role="marquee" aria-label="Frases da marca">
      <section className="ticker__viewport">
        <section className="ticker__track">
          {track.map((text, i) => (
            <span key={`${text}-${i}`} className="ticker__item">
              {text}
              <span className="ticker__dot" aria-hidden>
                ◆
              </span>
            </span>
          ))}
        </section>
      </section>
    </section>
  );
}
