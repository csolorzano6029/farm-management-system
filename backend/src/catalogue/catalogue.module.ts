import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueTypeEntity, CatalogueValueEntity } from './entities';
import { CatalogueTypeService, CatalogueValueService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogueTypeEntity, CatalogueValueEntity]),
  ],
  providers: [CatalogueTypeService, CatalogueValueService],
  exports: [CatalogueTypeService, CatalogueValueService],
})
export class CatalogueModule {}
