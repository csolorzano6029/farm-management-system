import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueTypeEntity } from './catalogue-type.entity';

@Entity({ name: 'catalogue_value' })
export class CatalogueValueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'code' })
  code: string;

  @Column({ nullable: true, name: 'description' })
  description: string;

  @Column({ default: '1', name: 'status' })
  status: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @ManyToOne(() => CatalogueTypeEntity, (type) => type.values)
  catalogueType: CatalogueTypeEntity;
}
