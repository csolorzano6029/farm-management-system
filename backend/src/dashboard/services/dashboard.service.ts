import { Injectable } from '@nestjs/common';
import { WorkerService } from '../../worker/services/worker.service';
import { WorkLogService } from '../../work-log/services/work-log.service';
import { SaleService } from '../../sales/services/sale.service';
import { ExpenseService } from '../../expense/services/expense.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly workerService: WorkerService,
    private readonly workLogService: WorkLogService,
    private readonly saleService: SaleService,
    private readonly expenseService: ExpenseService,
  ) {}

  async getWorkerSummary() {
    const workers = await this.workerService.findAll();
    const summaries = await Promise.all(
      workers.map(async (worker) => {
        const workLogs = await this.workLogService.findAll();
        const workerLogs = workLogs.filter(
          (log) => log.worker.id === worker.id,
        );
        const totalDaysWorked = workerLogs.length;
        const totalPay = workerLogs.reduce(
          (sum, log) => sum + log.worker?.dailyWage,
          0,
        );
        return {
          worker,
          totalDaysWorked,
          totalPay,
        };
      }),
    );
    return summaries;
  }

  async getSalesSummary() {
    const sales = await this.saleService.findAll();
    const totalSales = sales.reduce((sum, sale) => sum + sale.unitPrice, 0);
    return { totalSales, sales };
  }

  async getExpenseSummary() {
    const expenses = await this.expenseService.findAll();
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    return { totalExpenses, expenses };
  }

  async getDashboardData() {
    const workerSummary = await this.getWorkerSummary();
    const salesSummary = await this.getSalesSummary();
    const expenseSummary = await this.getExpenseSummary();
    return {
      workerSummary,
      salesSummary,
      expenseSummary,
    };
  }
}
