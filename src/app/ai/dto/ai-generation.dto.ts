import { IsArray, IsBoolean, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class Message {
  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsBoolean()
  ai?: boolean;
}

export class AiGenerationDto {


  @IsOptional()
  @IsString()
  prompt: string;

  @IsOptional()
  @IsArray()
  @Type(() => Message)
  messages: Message[];

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsNumber()
  words?: number;

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

  @IsOptional()
  @IsNumber()
  characters?: number;

  @IsOptional()
  @IsNumber()
  maxTokens?: number;

  @IsOptional()
  @IsString()
  theme: string;

  @IsOptional()
  @IsIn([
    'Web Site',
    'Instagram',
    'Reddit',
    'YouTube',
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
}
