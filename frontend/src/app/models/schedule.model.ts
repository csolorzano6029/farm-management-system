export interface ScheduleModel {
  id: string;
  date: string; // YYYY-MM-DD
  hours: number;
  isExtra: boolean;
  worker?: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export interface CreateScheduleDto {
  date: string;
  hours: number;
  isExtra: boolean;
  workerId: string;
}

// UI Models
export interface WorkerShift {
  id?: string; // Add ID for deletion
  name: string;
  hours: number;
  role: string;
  extra?: boolean;
}

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  shifts: WorkerShift[];
}
