import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CatalogueTypeService } from '../services/catalogue-type.service';
import { CatalogueTypeEntity } from '../entities/catalogue-type.entity';

@Controller('catalogue-types')
export class CatalogueTypeController {
  constructor(private readonly catalogueTypeService: CatalogueTypeService) {}

  @Get()
  findAll(): Promise<CatalogueTypeEntity[]> {
    return this.catalogueTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CatalogueTypeEntity> {
    return this.catalogueTypeService.findOne(id);
  }

  @Post()
  create(
    @Body() data: Partial<CatalogueTypeEntity>,
  ): Promise<CatalogueTypeEntity> {
    return this.catalogueTypeService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<CatalogueTypeEntity>,
  ): Promise<CatalogueTypeEntity> {
    return this.catalogueTypeService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.catalogueTypeService.delete(id);
  }
}
