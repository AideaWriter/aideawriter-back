import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { StripePaymentService } from '../../infrastructure/stripe/stripe.service';
import { UserRepositoryService } from '../../infrastructure/repository/user/user-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ScheduleModule.forRoot()
  ],
  providers: [StripeService, StripePaymentService, UserRepositoryService, UserService],
  controllers: [StripeController],
  exports: [StripeService]
})
export class StripeModule {
}
