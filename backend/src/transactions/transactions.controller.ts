import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
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
}
