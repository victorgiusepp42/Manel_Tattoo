import type { UpcomingTrip } from "../data/site";

const STATUS_LABEL = {
  confirmado: "Confirmado",
  "em breve": "Em breve",
  votacao: "Em votação",
} as const;

type Props = {
  trip: UpcomingTrip;
};

export function TripCard({ trip }: Props) {
  return (
    <article className="trip-card card-surface">
      <header className="trip-card__header">
        <h3 className="trip-card__city">
          {trip.city}
          <span className="trip-card__state">, {trip.state}</span>
        </h3>
        <span className={`trip-card__status trip-card__status--${trip.status.replace(" ", "-")}`}>
          {STATUS_LABEL[trip.status]}
        </span>
      </header>
      <p className="trip-card__period">{trip.period}</p>
      <p className="trip-card__studio">{trip.studio}</p>
      <p className="trip-card__address">{trip.address}</p>
    </article>
  );
}
