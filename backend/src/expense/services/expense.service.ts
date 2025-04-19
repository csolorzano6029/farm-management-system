import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseEntity } from '../entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
  ) {}

  async findAll(): Promise<ExpenseEntity[]> {
    return this.expenseRepository.find({ where: { status: '1' } });
  }

  async findOne(id: number): Promise<ExpenseEntity> {
    return this.expenseRepository.findOne({ where: { id, status: '1' } });
  }

  async create(data: Partial<ExpenseEntity>): Promise<ExpenseEntity> {
    const newExpense = this.expenseRepository.create(data);
    return this.expenseRepository.save(newExpense);
  }

  async update(
    id: number,
    data: Partial<ExpenseEntity>,
  ): Promise<ExpenseEntity> {
    const existingExpense = await this.findOne(id);

    if (!existingExpense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    await this.expenseRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const existingExpense = await this.findOne(id);

    if (!existingExpense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    await this.expenseRepository.delete(id);
  }
}
