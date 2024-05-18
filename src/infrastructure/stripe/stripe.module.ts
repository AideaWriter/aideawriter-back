import { Module } from '@nestjs/common';
import { StripePaymentService } from './stripe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../app/user/entities/user.entity';
import { UserRepositoryService } from '../repository/user/user-repository.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [TypeOrmModule, StripePaymentService, UserRepositoryService]
})
export class StripePaymentModule {
}
