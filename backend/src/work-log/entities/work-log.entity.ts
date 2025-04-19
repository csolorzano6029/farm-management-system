import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { WorkerEntity } from '../../worker/entities/worker.entity';

@Entity()
export class WorkLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkerEntity, { nullable: false })
  worker: WorkerEntity;

  @Column('date')
  workDate: string;

  @Column('decimal', { precision: 10, scale: 2 })
  dailyWage: number;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ default: '1' })
  status: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
