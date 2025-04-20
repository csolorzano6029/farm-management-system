import { decimal } from '../../common';
import type { WorkLogEntity } from '../../work-log';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'worker' })
export class WorkerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    name: 'daily_wage',
    transformer: decimal,
  })
  dailyWage: number;

  @Column({ default: '1' })
  status: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @OneToMany('WorkLogEntity', (worklog: WorkLogEntity) => worklog.worker)
  worklogs: WorkLogEntity[];
}
