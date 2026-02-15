import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueValue } from '../../catalogue/entities/catalogue-value.entity';
import { Worker } from '../../workers/entities/worker.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  type: 'INCOME' | 'EXPENSE';

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => CatalogueValue)
  @JoinColumn({ name: 'category_id' })
  category: CatalogueValue;

  @Column({ name: 'worker_id', nullable: true })
  workerId: string;

  @ManyToOne(() => Worker, { nullable: true })
  @JoinColumn({ name: 'worker_id' })
  worker: Worker;

  @Column('decimal', { nullable: true })
  quantity: number;

  @Column('decimal', { name: 'unit_price', nullable: true })
  unitPrice: number;

  @Column('decimal', { name: 'total_amount' })
  totalAmount: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
