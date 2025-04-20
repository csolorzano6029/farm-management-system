import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { WorkLogService } from '../services/work-log.service';
import { WorkLogEntity } from '../entities/work-log.entity';

@Controller('work-logs')
export class WorkLogController {
  constructor(private readonly workLogService: WorkLogService) {}

  @Get()
  findAll(): Promise<WorkLogEntity[]> {
    return this.workLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<WorkLogEntity> {
    return this.workLogService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<WorkLogEntity>): Promise<WorkLogEntity> {
    return this.workLogService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<WorkLogEntity>,
  ): Promise<WorkLogEntity> {
    return this.workLogService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.workLogService.delete(id);
  }
}
