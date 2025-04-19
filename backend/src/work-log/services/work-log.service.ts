import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkLogEntity } from '../entities/work-log.entity';

@Injectable()
export class WorkLogService {
  constructor(
    @InjectRepository(WorkLogEntity)
    private readonly workLogRepository: Repository<WorkLogEntity>,
  ) {}

  async findAll(): Promise<WorkLogEntity[]> {
    return this.workLogRepository.find({
      where: { status: '1' },
      relations: ['worker'],
    });
  }

  async findOne(id: number): Promise<WorkLogEntity> {
    return this.workLogRepository.findOne({
      where: { id, status: '1' },
      relations: ['worker'],
    });
  }

  async create(data: Partial<WorkLogEntity>): Promise<WorkLogEntity> {
    const newWorkLog = this.workLogRepository.create(data);
    return this.workLogRepository.save(newWorkLog);
  }

  async update(
    id: number,
    data: Partial<WorkLogEntity>,
  ): Promise<WorkLogEntity> {
    const existingWorkLog = await this.findOne(id);

    if (!existingWorkLog) {
      throw new NotFoundException(`WorkLog with ID ${id} not found`);
    }

    await this.workLogRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const existingWorkLog = await this.findOne(id);

    if (!existingWorkLog) {
      throw new NotFoundException(`WorkLog with ID ${id} not found`);
    }

    await this.workLogRepository.delete(id);
  }
}
