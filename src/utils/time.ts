export const generateTimeOptions = (intervalMinutes: number = 30) => {
  const times: string[] = [];
  for (let i = 0; i < 24 * 60; i += intervalMinutes) {
    const hours = Math.floor(i / 60);
    const minutes = i % 60;
    times.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  }
  return times;
};