import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';


export class CreateProjectDto {
  @IsOptional()
  uid: string;

  @IsString()
  name: string;

  @Type(() => String)
  @IsOptional()
  user: string;

  @Type(() => String)
  @IsOptional()
  articles: string[];
}
