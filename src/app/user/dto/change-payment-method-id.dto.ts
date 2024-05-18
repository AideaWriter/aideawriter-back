import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class ChangePaymentMethodIdDto {
  @Type(() => String)
  @IsString()
  @IsOptional()
  payment_method_id: string;
}
