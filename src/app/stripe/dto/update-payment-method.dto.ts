import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePaymentMethodDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  billing_customer_id: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  payment_method_id: string;
}
