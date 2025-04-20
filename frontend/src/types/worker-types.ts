export type Worklog = {
  id: number;
  workerId: number;
  workDate: string; // formato: YYYY-MM-DD
  journalUnits: number;
  isAdditional: boolean;
  isPaid: boolean;
  status: string;
  createdDate: string;
  updatedDate: string;
};

export type Worker = {
  id: number;
  name: string;
  dailyWage: number;
  status: string;
  createdDate: string;
  updatedDate: string;
  worklogs: Worklog[];
  total: number;
};
