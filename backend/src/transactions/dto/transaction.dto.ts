import { IsNumber, IsString } from 'class-validator';

export class TransactionDto {
  @IsString()
  month: string;

  @IsString()
  type: string;

  @IsNumber()
  total: number;
}
