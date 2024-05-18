import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {UpdateUserDto} from "../../app/user/dto/update-user.dto";
import { UserRepositoryService } from "../../infrastructure/repository/user/user-repository.service";

@ValidatorConstraint({ name: 'uniqueEmailUid', async: true })
@Injectable()
export class UniqueEmailPidValidator implements ValidatorConstraintInterface {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
  ) {}

  async validate(email: string, validationArguments?: ValidationArguments): Promise<boolean> {
    const dto = validationArguments?.object as UpdateUserDto;
    const uid = dto.uid;
    const provider = await this.userRepositoryService.checkIfUsersExistsByEmailAndUid(
      email,
      uid,
    );
    return !provider;
  }

  defaultMessage(): string {
    return 'Email address already exists 111';
  }
}
