import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';

@Injectable()
export class WorkersService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
  ) {}

  create(createWorkerDto: { firstName: string; lastName: string }) {
    const worker = this.workerRepository.create(createWorkerDto);
    return this.workerRepository.save(worker);
  }

  findAll() {
    return this.workerRepository.find({
      where: { active: true },
    });
  }

  findOne(id: string) {
    return this.workerRepository.findOneBy({ id, active: true });
  }

  async update(
    id: string,
    updateWorkerDto: {
      firstName?: string;
      lastName?: string;
      active?: boolean;
    },
  ) {
    await this.workerRepository.update(id, updateWorkerDto);
    return this.workerRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.workerRepository.update(id, { active: false });
    return { message: 'Worker deactivated' };
  }
}
