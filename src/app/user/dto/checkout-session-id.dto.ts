import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CheckoutSessionIdDto {
  @Type(() => String)
  @IsString()
  @IsOptional()
  checkout_session_id: string;
}
