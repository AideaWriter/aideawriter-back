import { Type } from 'class-transformer';
import { IsOptional, IsString, Matches } from 'class-validator';

export class ChangePasswordDto {
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
}
