import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkerEntity } from '../entities';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(WorkerEntity)
    private readonly workerRepository: Repository<WorkerEntity>,
  ) {}

  async findAll(): Promise<WorkerEntity[]> {
    return this.workerRepository.find({ where: { status: '1' } });
  }

  async findOne(id: number): Promise<WorkerEntity> {
    return this.workerRepository.findOne({ where: { id, status: '1' } });
  }

  async create(data: Partial<WorkerEntity>): Promise<WorkerEntity> {
    const newWorker = this.workerRepository.create(data);
    return this.workerRepository.save(newWorker);
  }

  async update(id: number, data: Partial<WorkerEntity>): Promise<WorkerEntity> {
    const existingWorker = await this.findOne(id);

    if (!existingWorker) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }

    await this.workerRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const existingWorker = await this.findOne(id);

    if (!existingWorker) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }

    await this.workerRepository.delete(id);
  }
}
