import { Module } from '@nestjs/common';
import { WorkerModule } from '../worker/worker.module';
import { WorkLogModule } from '../work-log/work-log.module';
import { SalesModule } from '../sales/sales.module';
import { ExpenseModule } from '../expense/expense.module';
import { DashboardController } from './controllers';
import { DashboardService } from './services';

@Module({
  imports: [WorkerModule, WorkLogModule, SalesModule, ExpenseModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
