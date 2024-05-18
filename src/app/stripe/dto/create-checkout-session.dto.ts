import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCheckoutSessionDto {

  // @Type(() => String)
  // @IsString()
  // @IsNotEmpty()
  // name: string;
  //
  // @Type(() => String)
  // @IsEmail()
  // @IsNotEmpty()
  // email: string;

  // @Type(() => String)
  // @IsNotEmpty()
  // @IsString()
  // billing_customer_id: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  price_id: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  success_url: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  cancel_url: string;
}
