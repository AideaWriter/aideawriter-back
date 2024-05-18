import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { OpenaiApi } from '../../infrastructure/ai/openai-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { TokenTrackerEntity } from './entity/tokenTracker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TokenTrackerEntity])
  ],
  controllers: [AiController],
  providers: [AiService, OpenaiApi],
  exports: [OpenaiApi]
})
export class AiModule {
}
