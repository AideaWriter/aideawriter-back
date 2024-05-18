import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCustomerDto {
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  billing_customer_id: string;
}
