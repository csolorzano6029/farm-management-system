import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogueTypeEntity } from '../entities/catalogue-type.entity';

@Injectable()
export class CatalogueTypeService {
  constructor(
    @InjectRepository(CatalogueTypeEntity)
    private readonly catalogueTypeRepository: Repository<CatalogueTypeEntity>,
  ) {}

  async findAll(): Promise<CatalogueTypeEntity[]> {
    return this.catalogueTypeRepository.find({ where: { status: '1' } });
  }

  async findOne(id: number): Promise<CatalogueTypeEntity> {
    return this.catalogueTypeRepository.findOne({ where: { id, status: '1' } });
  }

  async create(
    data: Partial<CatalogueTypeEntity>,
  ): Promise<CatalogueTypeEntity> {
    const newCatalogueType = this.catalogueTypeRepository.create(data);
    return this.catalogueTypeRepository.save(newCatalogueType);
  }

  async update(
    id: number,
    data: Partial<CatalogueTypeEntity>,
  ): Promise<CatalogueTypeEntity> {
    const existingCatalogueType = await this.findOne(id);

    if (!existingCatalogueType) {
      throw new NotFoundException(`CatalogueType with ID ${id} not found`);
    }

    await this.catalogueTypeRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const existingCatalogueType = await this.findOne(id);

    if (!existingCatalogueType) {
      throw new NotFoundException(`CatalogueType with ID ${id} not found`);
    }

    await this.catalogueTypeRepository.delete(id);
  }
}
