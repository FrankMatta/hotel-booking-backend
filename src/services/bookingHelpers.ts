export function isHighSeason(startDate: Date, endDate: Date): boolean {
  // Create Date objects for high season periods
  const highSeason1Start = new Date(startDate.getFullYear(), 5, 1); // June 1st
  const highSeason1End = new Date(startDate.getFullYear(), 9, 31); // October 31st
  const highSeason2Start = new Date(startDate.getFullYear(), 11, 21); // December 21st
  const highSeason2End = new Date(startDate.getFullYear() + 1, 0, 10); // January 10th of next year

  // Check if either date falls within a high season period
  return (
    (startDate >= highSeason1Start && startDate <= highSeason1End) ||
    (startDate >= highSeason2Start && startDate <= highSeason2End) ||
    (endDate >= highSeason1Start && endDate <= highSeason1End) ||
    (endDate >= highSeason2Start && endDate <= highSeason2End)
  );
}
