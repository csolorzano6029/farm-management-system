import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import { ExpenseEntity } from '../entities/expense.entity';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  findAll(): Promise<ExpenseEntity[]> {
    return this.expenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ExpenseEntity> {
    return this.expenseService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<ExpenseEntity>): Promise<ExpenseEntity> {
    return this.expenseService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<ExpenseEntity>,
  ): Promise<ExpenseEntity> {
    return this.expenseService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.expenseService.delete(id);
  }
}
