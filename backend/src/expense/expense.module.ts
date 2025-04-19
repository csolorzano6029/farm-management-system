import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from './entities';
import { ExpenseService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseEntity])],
  providers: [ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
