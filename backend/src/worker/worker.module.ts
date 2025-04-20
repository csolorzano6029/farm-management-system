import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerEntity } from './entities';
import { WorkerService } from './services';
import { WorkerController } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerEntity])],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
