import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { CreateCatalogueTypeDto } from './dto/create-catalogue-type.dto';
import { CreateCatalogueValueDto } from './dto/create-catalogue-value.dto';

@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Post('types')
  createType(@Body() createDto: CreateCatalogueTypeDto) {
    return this.catalogueService.createType(createDto);
  }

  @Get('types')
  findAllTypes() {
    return this.catalogueService.findAllTypes();
  }

  @Post('values')
  createValue(@Body() createDto: CreateCatalogueValueDto) {
    return this.catalogueService.createValue(createDto);
  }

  @Get('values')
  findAllValues() {
    return this.catalogueService.findAllValues();
  }

  @Get('values/type/:code')
  findValuesByType(@Param('code') code: string) {
    return this.catalogueService.findValuesByType(code);
  }

  @Get('values/type/:code/paginated')
  findValuesByTypePaginated(
    @Param('code') code: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.catalogueService.findValuesByTypePaginated(code, page, limit);
  }

  @Post('values/:id')
  updateValue(@Param('id') id: string, @Body() updateDto: any) {
    return this.catalogueService.updateValue(id, updateDto);
  }

  @Post('values/:id/delete')
  removeValue(@Param('id') id: string) {
    return this.catalogueService.removeValue(id);
  }
}
