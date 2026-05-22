import { tripAgendarMessage, type UpcomingTrip } from "../data/site";
import { cn } from "../lib/cn";
import { PointingHandIcon } from "./icons/PointingHandIcon";
import { WhatsAppButton } from "./WhatsAppButton";

const TRIPS_WITH_DATES = new Set(["sp", "rj"]);

type Props = {
  trip: UpcomingTrip;
};

export function TripCard({ trip }: Props) {
  const showPeriod = TRIPS_WITH_DATES.has(trip.id) && trip.period.trim().length > 0;
  const isFeatured = trip.id === "catalao";

  return (
    <article className={cn("trip-card card-surface", isFeatured && "trip-card--featured")}>
      <div className="trip-card__layout">
        <div className="trip-card__main">
          <h3 className="trip-card__city">
            {trip.city}
            <span className="trip-card__state"> - {trip.state}</span>
          </h3>
          {showPeriod ? <p className="trip-card__period">{trip.period}</p> : null}
        </div>

        <WhatsAppButton
          className="trip-card__agendar"
          hideIcon
          message={tripAgendarMessage(trip.city, trip.state, trip.period)}
        >
          <PointingHandIcon className="trip-card__agendar-hand shrink-0" />
          Agende aqui
        </WhatsAppButton>
      </div>
    </article>
  );
}
