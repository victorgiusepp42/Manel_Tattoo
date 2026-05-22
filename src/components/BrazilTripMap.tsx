import { tripPinTone, type UpcomingTrip } from "../data/site";
import { MAP_VIEWBOX, tripMapPin, type MapPinCity } from "../lib/brazilMapCoords";

type Props = {
  trips: readonly UpcomingTrip[];
};

export function BrazilTripMap({ trips }: Props) {
  return (
    <div className="brazil-map card-surface" aria-label="Mapa do Brasil com cidades de viagem">
      <div className="brazil-map__stage">
        <svg
          className="brazil-map__svg"
          viewBox={`0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <image href={`${import.meta.env.BASE_URL}brazil-map.svg`} width={MAP_VIEWBOX.w} height={MAP_VIEWBOX.h} />
          {trips.map((trip) => {
            const { x, y } = tripMapPin(trip.id as MapPinCity);
            const pinTone = tripPinTone(trip);
            return (
              <g
                key={trip.id}
                className={`brazil-map__pin brazil-map__pin--${pinTone}`}
                transform={`translate(${x} ${y})`}
              >
                <circle
                  className="brazil-map__pin-glow"
                  r={trip.id === "catalao" ? 17 : 14}
                />
                <circle className="brazil-map__pin-dot" r={trip.id === "catalao" ? 6.5 : 5.5} />
              </g>
            );
          })}
        </svg>
        <ul className="brazil-map__legend">
          {trips.map((trip) => {
            const pinTone = tripPinTone(trip);
            return (
              <li key={trip.id}>
                <span
                  className={`brazil-map__legend-dot brazil-map__legend-dot--${pinTone}`}
                  aria-hidden
                />
                {trip.city} - {trip.state}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
