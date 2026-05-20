import type { UpcomingTrip } from "../data/site";
import { MAP_VIEWBOX, tripMapPin } from "../lib/brazilMapCoords";

type Props = {
  trips: readonly UpcomingTrip[];
};

export function BrazilTripMap({ trips }: Props) {
  return (
    <div className="brazil-map card-surface" aria-label="Mapa do Brasil com cidades de viagem">
      <svg
        className="brazil-map__svg"
        viewBox={`0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <image href={`${import.meta.env.BASE_URL}brazil-map.svg`} width={MAP_VIEWBOX.w} height={MAP_VIEWBOX.h} />
        {trips.map((trip) => {
          const { x, y } = tripMapPin(trip.id as "sp" | "rj" | "goiania" | "brasilia");
          return (
            <g
              key={trip.id}
              className={`brazil-map__pin brazil-map__pin--${trip.status.replace(" ", "-")}`}
              transform={`translate(${x} ${y})`}
            >
              <circle className="brazil-map__pin-glow" r="14" />
              <circle className="brazil-map__pin-dot" r="5.5" />
            </g>
          );
        })}
      </svg>
      <ul className="brazil-map__legend">
        {trips.map((trip) => (
          <li key={trip.id}>
            <span
              className={`brazil-map__legend-dot brazil-map__legend-dot--${trip.status.replace(" ", "-")}`}
              aria-hidden
            />
            {trip.city}, {trip.state}
          </li>
        ))}
      </ul>
    </div>
  );
}
