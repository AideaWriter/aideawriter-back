import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiGenerationDto } from './dto/ai-generation.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('ai')
export class AiController {

  constructor(
    private aiService: AiService
  ) {
  }

  @Post(':uid')
  async aiGeneration(@Param('uid') uid: string, @Body() dto: AiGenerationDto) {
    return this.aiService.aiGeneration(uid, dto);
  }

  @Get(':uid')
  async getTokenTracker(@Param('uid') uid: string) {
    return this.aiService.getTokenTracker(uid);
  }
}

