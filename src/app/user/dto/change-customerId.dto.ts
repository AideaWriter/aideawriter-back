import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class ChangeCustomerIdDto {
  @Type(() => String)
  @IsString()
  @IsOptional()
  billing_customer_id: string;
}
