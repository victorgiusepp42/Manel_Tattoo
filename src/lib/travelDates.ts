const MONTHS_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;

const WEEKDAYS_PT = ["D", "S", "T", "Q", "Q", "S", "S"] as const;

export function monthLabelPt(year: number, month: number): string {
  return `${MONTHS_PT[month]!} de ${year}`;
}

export function weekdayLabelsPt(): readonly string[] {
  return WEEKDAYS_PT;
}

export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y!, m! - 1, d);
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isDateInRange(date: Date, startIso: string, endIso: string): boolean {
  const start = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);
  const t = date.setHours(12, 0, 0, 0);
  return t >= start.setHours(12, 0, 0, 0) && t <= end.setHours(12, 0, 0, 0);
}

export type CalendarCell = {
  date: Date;
  inMonth: boolean;
};

export function buildMonthGrid(year: number, month: number): CalendarCell[] {
  const first = new Date(year, month, 1);
  const startOffset = first.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    return { date, inMonth: date.getMonth() === month };
  });
}

export function monthIndex(year: number, month: number): number {
  return year * 12 + month;
}

export function clampViewMonth(
  year: number,
  month: number,
  min: { year: number; month: number },
  max: { year: number; month: number },
): { year: number; month: number } {
  const v = monthIndex(year, month);
  const lo = monthIndex(min.year, min.month);
  const hi = monthIndex(max.year, max.month);
  const clamped = Math.min(Math.max(v, lo), hi);
  return { year: Math.floor(clamped / 12), month: clamped % 12 };
}
