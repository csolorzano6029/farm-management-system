import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCatalogueValueDto {
  @IsString()
  catalogueTypeId: string;

  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  numericValue?: number;

  @IsString()
  @IsOptional()
  description?: string;
}
