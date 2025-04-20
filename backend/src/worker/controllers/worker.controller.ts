import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { WorkerService } from '../services/worker.service';
import { WorkerEntity } from '../entities/worker.entity';

@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  findAll(): Promise<WorkerEntity[]> {
    return this.workerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<WorkerEntity> {
    return this.workerService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<WorkerEntity>): Promise<WorkerEntity> {
    return this.workerService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<WorkerEntity>,
  ): Promise<WorkerEntity> {
    return this.workerService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.workerService.delete(id);
  }
}
