import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @Type(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;
}
