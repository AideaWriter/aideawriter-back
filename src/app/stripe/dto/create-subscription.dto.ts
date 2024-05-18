import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  price_id: string;
}
