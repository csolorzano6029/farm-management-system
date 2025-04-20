export interface WorkerSummary {
  worker: {
    id: number;
    name: string;
  };
  totalDaysWorked: number;
  totalPay: number;
}

export interface SaleSummary {
  id: number;
  product: string;
  quantity: number;
  totalPrice: number;
}

export interface ExpenseSummary {
  id: number;
  description: string;
  amount: number;
}

export interface DashboardData {
  workerSummary: WorkerSummary[];
  salesSummary: {
    totalSales: number;
    sales: SaleSummary[];
  };
  expenseSummary: {
    totalExpenses: number;
    expenses: ExpenseSummary[];
  };
}

export interface WeeklyWorklog {
  id: number;
  workerId: number;
  workDate: string; // o Date, si lo parseas
  journalUnits: number;
  isAdditional: boolean;
  isPaid: boolean;
  status: string;
  createdDate: string;
  updatedDate: string;
}

export interface WeeklyWorkerSummary {
  id: number;
  name: string;
  dailyWage: number;
  status: string;
  createdDate: string;
  updatedDate: string;
  worklogs: WeeklyWorklog[];
  total: number; // total a pagar
}
