import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepositoryService } from "../../infrastructure/repository/user/user-repository.service";

@ValidatorConstraint({ name: 'uniqueEmail', async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.checkIfUsersExistsByEmail(
      email,
    );
    console.log(user);
    return !user;
  }

  defaultMessage(): string {
    return 'Email address already exists';
  }
}

