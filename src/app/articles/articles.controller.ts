import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticlesDto } from './dto/create-articles.dto';
import { GetArticlesDto } from './dto/get-articles.dto';
import { UpdateArticlesDto } from './dto/update-articles.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';


@UseGuards(JwtGuard)
@Controller('articles')
export class ArticlesController {

  constructor(
    private articlesService: ArticlesService
  ) {
  }


  @Post()
  async createArticles(@Body() dto: CreateArticlesDto) {
    return this.articlesService.createArticles(dto);
  }

  @Get()
  async getAllArticles(@Query() dto: GetArticlesDto) {
    return this.articlesService.findAllArticles(dto);
  }

  @Get('project')
  async findAllArticlesByProject(@Query() dto: GetArticlesDto) {
    return this.articlesService.findAllArticlesByProject(dto);
  }

  @Get(':id')
  async getArticles(@Param('id') id: string) {
    return this.articlesService.findByIdArticle(id);
  }

  @Patch(':id')
  async updateArticles(@Param('id') id: string, @Body() dto: UpdateArticlesDto) {
    return this.articlesService.updateArticle(id, dto);
  }

  @Delete(':id')
  async removeArticles(@Param('id') id: string) {
    return this.articlesService.removeArticle(id);
  }
}
