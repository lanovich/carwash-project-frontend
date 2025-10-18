export interface TimeSlot {
  time: string;
  available: number;
}

export interface TimeSlotsApiResponse {
  date: string;
  slots: TimeSlot[]
}
