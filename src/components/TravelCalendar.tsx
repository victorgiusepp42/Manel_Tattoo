import { useMemo, useState } from "react";
import type { UpcomingTrip } from "../data/site";
import {
  buildMonthGrid,
  clampViewMonth,
  isDateInRange,
  monthIndex,
  monthLabelPt,
  weekdayLabelsPt,
} from "../lib/travelDates";

type Props = {
  trips: readonly UpcomingTrip[];
};

function tripDay(trips: readonly UpcomingTrip[], date: Date): boolean {
  return trips.some(
    (t) => t.startDate && t.endDate && isDateInRange(date, t.startDate, t.endDate),
  );
}

export function TravelCalendar({ trips }: Props) {
  const now = new Date();
  const minMonth = { year: now.getFullYear(), month: now.getMonth() };
  const maxMonth = { year: now.getFullYear(), month: 11 };

  const [view, setView] = useState(() =>
    clampViewMonth(now.getFullYear(), now.getMonth(), minMonth, maxMonth),
  );

  const cells = useMemo(
    () => buildMonthGrid(view.year, view.month),
    [view.year, view.month],
  );

  const atMin = monthIndex(view.year, view.month) <= monthIndex(minMonth.year, minMonth.month);
  const atMax = monthIndex(view.year, view.month) >= monthIndex(maxMonth.year, maxMonth.month);

  const shiftMonth = (delta: number) => {
    const next = new Date(view.year, view.month + delta, 1);
    setView(clampViewMonth(next.getFullYear(), next.getMonth(), minMonth, maxMonth));
  };

  return (
    <div className="travel-calendar card-surface">
      <div className="travel-calendar__head">
        <h3 className="travel-calendar__title">{monthLabelPt(view.year, view.month)}</h3>
        <div className="travel-calendar__nav">
          <button
            type="button"
            className="travel-calendar__nav-btn"
            onClick={() => shiftMonth(-1)}
            disabled={atMin}
            aria-label="Mês anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="travel-calendar__nav-btn"
            onClick={() => shiftMonth(1)}
            disabled={atMax}
            aria-label="Próximo mês"
          >
            ›
          </button>
        </div>
      </div>

      <div className="travel-calendar__weekdays" aria-hidden>
        {weekdayLabelsPt().map((d, i) => (
          <span key={`${d}-${i}`} className="travel-calendar__weekday">
            {d}
          </span>
        ))}
      </div>

      <div className="travel-calendar__grid" role="grid" aria-label={monthLabelPt(view.year, view.month)}>
        {cells.map(({ date, inMonth }) => {
          const highlighted = inMonth && tripDay(trips, date);
          return (
            <span
              key={date.toISOString()}
              role="gridcell"
              className={`travel-calendar__day ${inMonth ? "" : "travel-calendar__day--muted"} ${
                highlighted ? "travel-calendar__day--trip" : ""
              }`}
              aria-current={highlighted ? "date" : undefined}
            >
              {date.getDate()}
            </span>
          );
        })}
      </div>
    </div>
  );
}
