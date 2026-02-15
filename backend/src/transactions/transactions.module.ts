import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { CatalogueModule } from '../catalogue/catalogue.module';
import { WorkersModule } from '../workers/workers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    CatalogueModule,
    WorkersModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
