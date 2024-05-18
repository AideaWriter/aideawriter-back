import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class ChangeSubscriptionDto {
  @Type(() => String)
  @IsString()
  @IsOptional()
  billing_subscription_id: string;
}
