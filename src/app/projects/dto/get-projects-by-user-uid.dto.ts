import { IsString } from 'class-validator';

export class GetProjectsByUserUidDto {
  @IsString()
  uid: string;
}
