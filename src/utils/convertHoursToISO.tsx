// utils/convertHoursToISO.ts

export function convertHoursToISO({
  openingHour,
  closingHour,
  dateString,
}: {
  openingHour: string | undefined,
  closingHour: string | undefined,
  dateString: Date,
}): { openingISO: string, closingISO: string } {

  const baseDate = new Date(dateString);
  const [openingH, openingM] = openingHour?.split(":").map(Number) || [0, 0];
  const [closingH, closingM] = closingHour?.split(":").map(Number) || [0, 0];

  const openingDate = new Date(baseDate);
  openingDate.setUTCHours(openingH, openingM, 0, 0);

  const closingDate = new Date(baseDate);
  closingDate.setUTCHours(closingH, closingM, 0, 0);

  return {
    openingISO: openingDate.toISOString(),
    closingISO: closingDate.toISOString(),
  };
}
