export const getDayRange = () => {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  // Get start of the day
  
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  // Get end of the day
  
  return { startOfDay, endOfDay };
}