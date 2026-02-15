import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    // If totalAmount is not provided but quantity and unitPrice are, calculate it.
    // For now assuming frontend sends strict data, but let's be safe.
    let total = createTransactionDto.totalAmount;
    if (
      !total &&
      createTransactionDto.quantity &&
      createTransactionDto.unitPrice
    ) {
      total = createTransactionDto.quantity * createTransactionDto.unitPrice;
    }

    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      totalAmount: total,
    });
    return this.transactionRepository.save(transaction);
  }

  findAll() {
    return this.transactionRepository.find({
      relations: ['category', 'worker'],
      order: { date: 'DESC' },
    });
  }

  async getDashboardStats() {
    const incomeResult = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.totalAmount)', 'total')
      .where('transaction.type = :type', { type: 'INCOME' })
      .getRawOne();

    const expenseResult = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.totalAmount)', 'total')
      .where('transaction.type = :type', { type: 'EXPENSE' })
      .getRawOne();

    const income = parseFloat(incomeResult.total) || 0;
    const expense = parseFloat(expenseResult.total) || 0;

    const recentTransactions = await this.transactionRepository.find({
      order: { date: 'DESC' },
      take: 5,
    });

    return {
      income,
      expense,
      balance: income - expense,
      recentTransactions,
    };
  }
}
