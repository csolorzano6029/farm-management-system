import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
  IsUUID,
} from 'class-validator';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export class CreateTransactionDto {
  @IsDateString()
  date: Date;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsString()
  @IsUUID() // Assuming categoryId is a UUID, adjust if it's standard string
  categoryId: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  workerId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  unitPrice?: number;

  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
