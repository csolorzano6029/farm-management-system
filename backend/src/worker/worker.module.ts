import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerEntity } from './entities';
import { WorkerService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerEntity])],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
