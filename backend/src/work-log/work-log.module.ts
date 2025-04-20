import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkLogEntity } from './entities';
import { WorkLogService } from './services';
import { WorkLogController } from './controllers/';

@Module({
  imports: [TypeOrmModule.forFeature([WorkLogEntity])],
  controllers: [WorkLogController],
  providers: [WorkLogService],
  exports: [WorkLogService],
})
export class WorkLogModule {}
