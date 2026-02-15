import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueType } from './catalogue-type.entity';

@Entity('catalogue_value')
export class CatalogueValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'catalogue_type_id' })
  catalogueTypeId: string;

  @ManyToOne(() => CatalogueType, (type) => type.values)
  @JoinColumn({ name: 'catalogue_type_id' })
  type: CatalogueType;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column('decimal', { name: 'numeric_value', nullable: true })
  numericValue: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
