import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogueType } from './entities/catalogue-type.entity';
import { CatalogueValue } from './entities/catalogue-value.entity';
import { CreateCatalogueTypeDto } from './dto/create-catalogue-type.dto';
import { CreateCatalogueValueDto } from './dto/create-catalogue-value.dto';

@Injectable()
export class CatalogueService {
  constructor(
    @InjectRepository(CatalogueType)
    private readonly typeRepository: Repository<CatalogueType>,
    @InjectRepository(CatalogueValue)
    private readonly valueRepository: Repository<CatalogueValue>,
  ) {}

  async createType(createDto: CreateCatalogueTypeDto) {
    const type = this.typeRepository.create(createDto);
    return this.typeRepository.save(type);
  }

  async findAllTypes() {
    return this.typeRepository.find({
      relations: ['values'],
      where: { active: true },
    });
  }

  async createValue(createDto: CreateCatalogueValueDto) {
    const value = this.valueRepository.create(createDto);
    return this.valueRepository.save(value);
  }

  async findAllValues() {
    return this.valueRepository.find({
      relations: ['type'],
      where: { active: true },
    });
  }

  async findValuesByType(code: string) {
    const type = await this.typeRepository.findOne({
      where: { code, active: true },
    });
    if (!type) {
      throw new Error(`CatalogueType with code ${code} not found`);
    }
    return this.valueRepository.find({
      where: { type: { id: type.id }, active: true },
    });
  }

  async findValuesByTypePaginated(code: string, page: number, limit: number) {
    const type = await this.typeRepository.findOne({
      where: { code, active: true },
    });

    if (!type) {
      return { data: [], total: 0 };
    }

    const [data, total] = await this.valueRepository.findAndCount({
      where: { type: { id: type.id }, active: true },
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'ASC' },
    });

    return { data, total };
  }

  async updateValue(id: string, updateDto: any) {
    await this.valueRepository.update(id, updateDto);
    return this.valueRepository.findOne({ where: { id } });
  }

  async removeValue(id: string) {
    await this.valueRepository.update(id, { active: false });
    return { deleted: true };
  }
}
