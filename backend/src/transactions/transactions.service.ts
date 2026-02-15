import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    let total = updateTransactionDto.totalAmount;

    // simplistic logic: if quantity/unitPrice are in DTO, recalc total if not explicit
    // In a real app we might fetch existing entity to merge
    if (
      !total &&
      updateTransactionDto.quantity &&
      updateTransactionDto.unitPrice
    ) {
      total = updateTransactionDto.quantity * updateTransactionDto.unitPrice;
    }

    // If we have a computed total, use it
    const dataToUpdate = { ...updateTransactionDto };
    if (total !== undefined) {
      dataToUpdate.totalAmount = total;
    }

    await this.transactionRepository.update(id, dataToUpdate);
    return this.transactionRepository.findOne({
      where: { id },
      relations: ['category', 'worker'],
    });
  }

  async remove(id: string) {
    await this.transactionRepository.update(id, { active: false });
    return { deleted: true };
  }

  findAll() {
    return this.transactionRepository.find({
      relations: ['category', 'worker'],
      where: { active: true },
      order: { date: 'DESC' },
    });
  }

  async findAllPaged(page: number, limit: number) {
    const [data, total] = await this.transactionRepository.findAndCount({
      relations: ['category', 'worker'],
      where: { active: true },
      order: { date: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getDashboardStats() {
    const incomeResult = (await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.totalAmount)', 'total')
      .where('transaction.type = :type', { type: 'INGRESO' })
      .andWhere('transaction.active = :active', { active: true })
      .getRawOne()) as { total: string };

    const expenseResult = (await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.totalAmount)', 'total')
      .where('transaction.type = :type', { type: 'GASTO' })
      .andWhere('transaction.active = :active', { active: true })
      .getRawOne()) as { total: string };

    const income = Number.parseFloat(incomeResult.total) || 0;
    const expense = Number.parseFloat(expenseResult.total) || 0;

    const recentTransactions = await this.transactionRepository.find({
      where: { active: true },
      order: { date: 'DESC' },
      take: 5,
      relations: ['category'],
    });

    return {
      income,
      expense,
      balance: income - expense,
      recentTransactions,
    };
  }
}
