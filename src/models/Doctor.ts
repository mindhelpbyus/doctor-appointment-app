export interface ITimeRange {
  start: string; // HH:mm format (e.g., "09:00")
  end: string;   // HH:mm format (e.g., "17:00")
}

export interface IAvailability {
  dayOfWeek: number; // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  isAvailable: boolean;
  time_ranges: ITimeRange[];
}