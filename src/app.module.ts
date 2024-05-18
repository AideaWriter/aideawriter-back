import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { AiModule } from './app/ai/ai.module';
import { DatabaseModule } from './config/database.module';
import { ArticlesModule } from './app/articles/articles.module';
import { ProjectsModule } from './app/projects/projects.module';
import { MailgunModule } from './infrastructure/email-api/mailgun/mailgun.module';
import { StripePaymentModule } from './infrastructure/stripe/stripe.module';
import { StripeModule } from './app/stripe/stripe.module';
import { StripeWebhookModule } from './app/stripe_webhook/stripe_webhook.module';


@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    AiModule,
    ArticlesModule,
    ProjectsModule,
    MailgunModule,
    StripePaymentModule,
    StripeModule,
    StripeWebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

