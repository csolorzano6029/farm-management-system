import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Worker } from '../workers/entities/worker.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly schedulesRepository: Repository<Schedule>,
    @InjectRepository(Worker)
    private readonly workersRepository: Repository<Worker>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const worker = await this.workersRepository.findOneBy({
      id: createScheduleDto.workerId,
    });
    if (!worker) {
      throw new Error('Worker not found');
    }

    const schedule = this.schedulesRepository.create({
      ...createScheduleDto,
      worker,
    });

    return this.schedulesRepository.save(schedule);
  }

  async findAllByMonth(year: number, month: number): Promise<Schedule[]> {
    // Month is 0-indexed in JS dates but let's assume API sends 1-12
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Last day of the month

    // TypeORM date types usually work with strings or Date objects depending on driver.
    // Ensure date comparison works correctly. Using YYYY-MM-DD strings often safer.

    // Using QueryBuilder might be safer for dates but basic Find options:
    return this.schedulesRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      relations: ['worker'],
      order: {
        date: 'ASC',
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.schedulesRepository.delete(id);
  }
}
