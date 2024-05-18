import { Module } from '@nestjs/common';
import { StripeWebhookController } from './stripe_webhook.controller';
import { StripeWebhookService } from './stripe_webhook.service';
import { UserService } from '../user/user.service';
import { UserRepositoryService } from '../../infrastructure/repository/user/user-repository.service';
import { UserEntity } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    StripeModule,
  ],
  controllers: [StripeWebhookController],
  providers: [StripeWebhookService, UserRepositoryService, UserRepositoryService, UserService]
})

export class StripeWebhookModule {
}
