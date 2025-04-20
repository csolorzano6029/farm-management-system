import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './entities';
import { SaleService } from './services';
import { SaleController } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity])],
  controllers: [SaleController],
  providers: [SaleService],
  exports: [SaleService],
})
export class SalesModule {}
