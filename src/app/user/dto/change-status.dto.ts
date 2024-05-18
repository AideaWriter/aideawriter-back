import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ChangeStatusDto {
  @Type(() => String)
  @IsString()
  @IsOptional()
  billing_status: string;

  @IsNumber()
  @IsOptional()
  articles: number;
}
