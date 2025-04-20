import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import type { WorkerEntity } from '../../worker';

@Entity({ name: 'work_log' })
export class WorkLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'worker_id' })
  workerId: number;

  @Column({ name: 'hours_worked' })
  hoursWorked: number;

  @Column({ default: false, name: 'is_paid' })
  isPaid: boolean;

  @Column({ default: '1', name: 'status' })
  status: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @ManyToOne('WorkerEntity', (worker: WorkerEntity) => worker.worklogs)
  @JoinColumn({ name: 'id' })
  worker: WorkerEntity;
}
