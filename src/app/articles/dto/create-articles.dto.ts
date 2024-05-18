import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateArticlesDto {
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
  text: any = {
    'time': 1709114611185,
    'blocks': []
  };

  @IsOptional()
  @IsNumber()
  maxTokens?: number;

  @Type(() => String)
  @IsOptional()
  theme: string;

  @IsOptional()
  @IsIn([
    'Instagram',
    'YouTube',
    'Web Site',
    'SEO',
    'Thesis',
  ])
  @IsString()
  textFor?: string;

  @IsOptional()
  @IsArray()
  titles?: string[];

  @IsOptional()
  @IsArray()
  keyWords?: string[];

  @IsOptional()
  @IsNumber()
  temperature: number;

  @IsOptional()
  @IsNumber()
  top_p: number;

  @IsOptional()
  @IsNumber()
  frequency_penalty: number;

  @IsOptional()
  @IsNumber()
  presence_penalty: number;

  @IsOptional()
  @IsNumber()
  n: number;

  @IsOptional()
  @IsBoolean()
  stream: boolean;

  @IsOptional()
  @IsNumber()
  logprobs: number | null;

  @IsOptional()
  @IsIn([
    `English`,
    `Spanish`,
    `French`,
    `Portuguese`,
    `Russian`,
    `German`,
  ])
  @IsString()
  language: string;

  @Type(() => String)
  @IsOptional()
  projects: string;

  @Type(() => String)
  @IsOptional()
  project_name: string;

  @Type(() => String)
  @IsOptional()
  user_id: string;

  @Type(() => Date)
  @IsOptional()
  created_at?: Date;

  constructor() {
    this.created_at = new Date(); // Устанавливает текущую дату и время по умолчанию
  }
}
