import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './entities';
import { SaleService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity])],
  providers: [SaleService],
  exports: [SaleService],
})
export class SalesModule {}
