import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CatalogueValueEntity } from './catalogue-value.entity';

@Entity({ name: 'catalogue_type' })
export class CatalogueTypeEntity {
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

  @OneToMany(() => CatalogueValueEntity, (value) => value.catalogueType)
  values: CatalogueValueEntity[];
}
