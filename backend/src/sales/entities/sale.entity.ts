import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { decimal } from '../../common';

@Entity({ name: 'sale' })
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_name' })
  product: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    name: 'quantity',
    transformer: [decimal],
  })
  quantity: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    name: 'unit_price',
    transformer: [decimal],
  })
  unitPrice: number;

  @Column('date', { name: 'sale_date' })
  saleDate: string;

  @Column({ default: '1', name: 'status' })
  status: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
