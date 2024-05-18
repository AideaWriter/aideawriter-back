import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepositoryService } from '../../infrastructure/repository/user/user-repository.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from '../../infrastructure/passport/local.strategy';
import { JwtStrategy } from '../../infrastructure/passport/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailgunModule } from '../../infrastructure/email-api/mailgun/mailgun.module';


@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    MailgunModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserRepositoryService],
  exports: [UserRepositoryService]
})
export class AuthModule {
}

