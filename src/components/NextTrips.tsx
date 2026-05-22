import { UPCOMING_TRIPS } from "../data/site";
import { BrazilTripMap } from "./BrazilTripMap";
import { SectionHeading } from "./SectionHeading";
import { TripCard } from "./TripCard";

export function NextTrips() {
  return (
    <section id="proximas-viagens" className="section-panel py-16 md:py-20 section-enter">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading line1="Próximas" line2="Viagens" layout="inline" className="mb-8" />

        <div className="trips-stack">
          <BrazilTripMap trips={UPCOMING_TRIPS} />
          <ul className="trips-list">
            {UPCOMING_TRIPS.map((trip) => (
              <li key={trip.id}>
                <TripCard trip={trip} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
