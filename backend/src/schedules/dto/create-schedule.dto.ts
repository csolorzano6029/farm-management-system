import {
  IsDateString,
  IsInt,
  IsBoolean,
  IsNotEmpty,
  IsUUID,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsDateString()
  date: string; // ISO date string YYYY-MM-DD

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(24)
  hours: number;

  @IsOptional()
  @IsBoolean()
  isExtra?: boolean;

  @IsNotEmpty()
  @IsUUID()
  workerId: string;
}
