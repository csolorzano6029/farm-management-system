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
