import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueTypeEntity, CatalogueValueEntity } from './entities';
import { CatalogueTypeService, CatalogueValueService } from './services';
import {
  CatalogueTypeController,
  CatalogueValueController,
} from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogueTypeEntity, CatalogueValueEntity]),
  ],
  controllers: [CatalogueTypeController, CatalogueValueController],
  providers: [CatalogueTypeService, CatalogueValueService],
  exports: [CatalogueTypeService, CatalogueValueService],
})
export class CatalogueModule {}
