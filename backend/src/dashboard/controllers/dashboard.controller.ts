import { Controller, Get } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboardData() {
    return this.dashboardService.getDashboardData();
  }

  @Get('weekly-summary')
  async getWeeklySummary() {
    return this.dashboardService.getWeeklySummary();
  }
}
