import { Injectable } from '@nestjs/common';
import { AiGenerationDto } from './dto/ai-generation.dto';
import { OpenaiApi } from '../../infrastructure/ai/openai-api.service';


@Injectable()
export class AiService {

  constructor(
    private openaiApiService: OpenaiApi
  ) {
  }

  async aiGeneration(uid: string, dto: AiGenerationDto) {
    return this.openaiApiService.openaiGeneration(uid, dto);
  }

  async getTokenTracker(uid: string) {
    return this.openaiApiService.getTokenTracker(uid);
  }
}
