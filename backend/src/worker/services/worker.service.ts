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

  private async getWorkersWithWorkLogsInRange(
    startOfWeek: string,
    endOfWeek: string,
  ): Promise<WorkerEntity[]> {
    return this.workerRepository
      .createQueryBuilder('worker')
      .leftJoinAndSelect('worker.worklogs', 'worklog')
      .where('worker.status = :status', { status: '1' })
      .andWhere('worklog.workDate BETWEEN :startOfWeek AND :endOfWeek', {
        startOfWeek,
        endOfWeek,
      })
      .getMany();
  }

  async findWorkersWithWorkLogsInRange(): Promise<WorkerEntity[]> {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calcular el lunes (inicio de semana)
    const startOfWeek = new Date(today);
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(today.getDate() - daysSinceMonday);

    // Calcular el domingo (fin de semana)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startOfWeekString = startOfWeek.toISOString().split('T')[0];
    const endOfWeekString = endOfWeek.toISOString().split('T')[0];

    return this.getWorkersWithWorkLogsInRange(
      startOfWeekString,
      endOfWeekString,
    );
  }
}
