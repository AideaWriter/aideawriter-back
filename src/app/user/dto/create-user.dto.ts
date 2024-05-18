import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Matches, Validate } from 'class-validator';
import { UniqueEmailValidator } from '../../../common/validators/unique-email.validator';


export class CreateUserDto {

  @IsOptional()
  uid: string;

  @Type(() => String)
  @IsEmail(
    {},
    {
      message: 'Please enter a valid email address',
    },
  )
  @Validate(UniqueEmailValidator)
  email: string;


  @Type(() => String)
  @IsString()
  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}.*$/, {
    message: `· Must be at least 8 characters long</br>
· Use at least one digit (0-9)</br>
· Use at least one special characters like (!@#$%^&*)</br>
· Must be at least 8 characters long</br>
· Use lowercase and uppercase letters (a-Z)`,
  })
  password?: string;

  @Type(() => String)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsOptional()
  name: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  billing_status = 'trialing';

  @Type(() => String)
  @IsString()
  @IsOptional()
  billing_subscription_id?: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  billing_customer_id?: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  checkout_session_id: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  start_sub: string;


  @Type(() => String)
  @IsString()
  @IsOptional()
  end_sub: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  role?: string;

  @IsBoolean()
  @IsOptional()
  is_email_confirmed?: boolean = false;

  @Type(() => String)
  @IsString()
  @IsArray()
  @IsOptional()
  project: string[];

  @IsNumber()
  @IsOptional()
  articles: number;
}

