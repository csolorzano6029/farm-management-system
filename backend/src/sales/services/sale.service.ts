import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from '../entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  async findAll(): Promise<SaleEntity[]> {
    return this.saleRepository.find({ where: { status: '1' } });
  }

  async findOne(id: number): Promise<SaleEntity> {
    return this.saleRepository.findOne({ where: { id, status: '1' } });
  }

  async create(data: Partial<SaleEntity>): Promise<SaleEntity> {
    const newSale = this.saleRepository.create(data);
    return this.saleRepository.save(newSale);
  }

  async update(id: number, data: Partial<SaleEntity>): Promise<SaleEntity> {
    const existingSale = await this.findOne(id);

    if (!existingSale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }

    await this.saleRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const existingSale = await this.findOne(id);

    if (!existingSale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }

    await this.saleRepository.delete(id);
  }
}
