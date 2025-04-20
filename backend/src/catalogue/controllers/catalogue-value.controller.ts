import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CatalogueValueService } from '../services/catalogue-value.service';
import { CatalogueValueEntity } from '../entities/catalogue-value.entity';

@Controller('catalogue-values')
export class CatalogueValueController {
  constructor(private readonly catalogueValueService: CatalogueValueService) {}

  @Get()
  findAll(): Promise<CatalogueValueEntity[]> {
    return this.catalogueValueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CatalogueValueEntity> {
    return this.catalogueValueService.findOne(id);
  }

  @Post()
  create(
    @Body() data: Partial<CatalogueValueEntity>,
  ): Promise<CatalogueValueEntity> {
    return this.catalogueValueService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<CatalogueValueEntity>,
  ): Promise<CatalogueValueEntity> {
    return this.catalogueValueService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.catalogueValueService.delete(id);
  }
}
