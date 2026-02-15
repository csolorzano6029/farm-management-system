import { IsString, IsOptional } from 'class-validator';

export class CreateCatalogueTypeDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
