import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class ChangeDataSubscriptionDto {
  @Type(() => String)
  @IsString()
  @IsOptional()
  start_sub: string;


  @Type(() => String)
  @IsString()
  @IsOptional()
  end_sub: string;
}
