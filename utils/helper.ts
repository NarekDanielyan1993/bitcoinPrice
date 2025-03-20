export function getDateMinusDays(days: number) {
  const now = new Date();
  now.setDate(now.getDate() - days);
  return now.toISOString().split("T")[0]; // Returns in YYYY-MM-DD format
}
