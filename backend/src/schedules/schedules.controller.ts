import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  findAll(@Query('year') year: string, @Query('month') month: string) {
    // Basic validation or default to current date
    const y = year ? Number.parseInt(year, 10) : new Date().getFullYear();
    const m = month ? Number.parseInt(month, 10) : new Date().getMonth() + 1;
    return this.schedulesService.findAllByMonth(y, m);
  }
}
