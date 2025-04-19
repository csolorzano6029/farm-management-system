import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogueValueEntity } from '../entities/catalogue-value.entity';

@Injectable()
export class CatalogueValueService {
  constructor(
    @InjectRepository(CatalogueValueEntity)
    private readonly catalogueValueRepository: Repository<CatalogueValueEntity>,
  ) {}

  async findAll(): Promise<CatalogueValueEntity[]> {
    return this.catalogueValueRepository.find({ where: { status: '1' } });
  }

  async findOne(id: number): Promise<CatalogueValueEntity> {
    return this.catalogueValueRepository.findOne({
      where: { id, status: '1' },
    });
  }

  async create(
    data: Partial<CatalogueValueEntity>,
  ): Promise<CatalogueValueEntity> {
    const newCatalogueValue = this.catalogueValueRepository.create(data);
    return this.catalogueValueRepository.save(newCatalogueValue);
  }

  async update(
    id: number,
    data: Partial<CatalogueValueEntity>,
  ): Promise<CatalogueValueEntity> {
    const existingCatalogueValue = await this.findOne(id);

    if (!existingCatalogueValue) {
      throw new NotFoundException(`CatalogueValue with ID ${id} not found`);
    }

    await this.catalogueValueRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const existingCatalogueValue = await this.findOne(id);

    if (!existingCatalogueValue) {
      throw new NotFoundException(`CatalogueValue with ID ${id} not found`);
    }

    await this.catalogueValueRepository.delete(id);
  }
}
