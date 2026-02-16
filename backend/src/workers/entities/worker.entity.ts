import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Schedule } from '../../schedules/entities/schedule.entity';

@Entity('workers')
export class Worker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ nullable: true })
  role: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.worker)
  transactions: Transaction[];

  @OneToMany(() => Schedule, (schedule) => schedule.worker)
  schedules: Schedule[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
