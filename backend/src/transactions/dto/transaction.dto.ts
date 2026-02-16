import { IsNumber, IsString } from 'class-validator';

export class TransactionDto {
  @IsString()
  month: string;

  @IsString()
  type: string;

  @IsString()
  categoryName: string;

  @IsNumber()
  total: number;

  @IsNumber()
  totalQuantity: number;
}
