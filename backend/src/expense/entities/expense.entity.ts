import { decimal } from '../../common';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'expense' })
export class ExpenseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'description' })
  description: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    name: 'amount',
    transformer: decimal,
  })
  amount: number;

  @Column({ default: '1', name: 'status' })
  status: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
