import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get('paged')
  findAllPaged(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.transactionsService.findAllPaged(+page, +limit);
  }

  @Get('stats')
  getStats() {
    return this.transactionsService.getDashboardStats();
  }

  @Get('chart-data')
  getChartData() {
    return this.transactionsService.getChartData();
  }

  @Get('production-data')
  getProductionData() {
    return this.transactionsService.getProductionData();
  }
}
