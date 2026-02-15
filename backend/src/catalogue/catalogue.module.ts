import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueService } from './catalogue.service';
import { CatalogueController } from './catalogue.controller';
import { CatalogueType } from './entities/catalogue-type.entity';
import { CatalogueValue } from './entities/catalogue-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogueType, CatalogueValue])],
  controllers: [CatalogueController],
  providers: [CatalogueService],
  exports: [CatalogueService],
})
export class CatalogueModule {}
