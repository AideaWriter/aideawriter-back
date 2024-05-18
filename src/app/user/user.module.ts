import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepositoryService } from '../../infrastructure/repository/user/user-repository.service';
import { UniqueEmailValidator } from '../../common/validators/unique-email.validator';
import { UniqueEmailPidValidator } from '../../common/validators/unique-email-uid.validator';
import { StripeService } from '../stripe/stripe.service';
import { StripePaymentService } from '../../infrastructure/stripe/stripe.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepositoryService, UniqueEmailValidator, UniqueEmailPidValidator, StripeService, StripePaymentService],
  exports: [TypeOrmModule, UserRepositoryService]
})
export class UserModule {
}
