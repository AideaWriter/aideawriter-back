import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateArticlesDto {
  @IsOptional()
  uid: string;

  @Type(() => String)
  @IsOptional()
  model: string;

  @Type(() => Number)
  @IsOptional()
  words: number;

  @Type(() => Number)
  @IsOptional()
  characters: number;

  @Type(() => String)
  @IsOptional()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  text: any;

  @Type(() => String)
  @IsOptional()
  body: string;

  @Type(() => String)
  @IsOptional()
  projects: string;
}
