import { addDays, format, startOfDay, getDay, setHours, setMinutes } from 'date-fns';
import { IAvailability, ITimeRange } from '@/models/Doctor';

export const generateTimeOptions = (intervalMinutes: number = 30) => {
  const times: string[] = [];
  for (let i = 0; i < 24 * 60; i += intervalMinutes) {
    const hours = Math.floor(i / 60);
    const minutes = i % 60;
    times.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  }
  return times;
};

export const generateFutureAvailabilitySlots = (
  weeklyAvailability: IAvailability[],
  startDate: Date,
  numDays: number = 14,
  intervalMinutes: number = 30
): { date: string; slots: string[] }[] => {
  const futureSlots: { date: string; slots: string[] }[] = [];
  const today = startOfDay(new Date());

  for (let i = 0; i < numDays; i++) {
    const currentDate = addDays(startDate, i);
    const dayOfWeek = getDay(currentDate); // 0 for Sunday, 1 for Monday, etc.

    const dayAvailability = weeklyAvailability.find(
      (avail) => avail.dayOfWeek === dayOfWeek && avail.isAvailable
    );

    if (dayAvailability) {
      const slotsForDay: string[] = [];
      dayAvailability.time_ranges.forEach((range) => {
        let currentSlotTime = setHours(setMinutes(currentDate, parseInt(range.start.split(':')[1])), parseInt(range.start.split(':')[0]));
        const endTime = setHours(setMinutes(currentDate, parseInt(range.end.split(':')[1])), parseInt(range.end.split(':')[0]));

        while (currentSlotTime < endTime) {
          // Only add slots that are in the future relative to now
          if (currentDate.toDateString() === today.toDateString()) {
            if (currentSlotTime > new Date()) {
              slotsForDay.push(format(currentSlotTime, 'HH:mm'));
            }
          } else {
            slotsForDay.push(format(currentSlotTime, 'HH:mm'));
          }
          currentSlotTime = addMinutes(currentSlotTime, intervalMinutes);
        }
      });
      if (slotsForDay.length > 0) {
        futureSlots.push({ date: format(currentDate, 'yyyy-MM-dd'), slots: slotsForDay });
      }
    }
  }
  return futureSlots;
};

// Helper for addMinutes, as date-fns addMinutes is not directly imported
function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}