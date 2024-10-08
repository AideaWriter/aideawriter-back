import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserDto {

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number;
}
