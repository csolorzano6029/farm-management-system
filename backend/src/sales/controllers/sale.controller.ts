import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SaleService } from '../services/sale.service';
import { SaleEntity } from '../entities/sale.entity';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  findAll(): Promise<SaleEntity[]> {
    return this.saleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SaleEntity> {
    return this.saleService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<SaleEntity>): Promise<SaleEntity> {
    return this.saleService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<SaleEntity>,
  ): Promise<SaleEntity> {
    return this.saleService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.saleService.delete(id);
  }
}
