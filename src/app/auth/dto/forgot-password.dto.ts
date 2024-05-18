import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @Type(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
