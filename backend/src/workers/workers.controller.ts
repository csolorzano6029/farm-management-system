import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkersService } from './workers.service';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  create(@Body() createWorkerDto: { firstName: string; lastName: string }) {
    return this.workersService.create(createWorkerDto);
  }

  @Get()
  findAll() {
    return this.workersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateWorkerDto: {
      firstName?: string;
      lastName?: string;
      active?: boolean;
    },
  ) {
    return this.workersService.update(id, updateWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workersService.remove(id);
  }
}
