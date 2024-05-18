import { Injectable } from '@nestjs/common';
import { ArticlesRepositoryService } from '../../infrastructure/repository/articles/articles-repository.service';
import { CreateArticlesDto } from './dto/create-articles.dto';
import { GetArticlesDto } from './dto/get-articles.dto';
import { UpdateArticlesDto } from './dto/update-articles.dto';

@Injectable()
export class ArticlesService {
  constructor(readonly articlesRepository: ArticlesRepositoryService) {
  }

  async createArticles(dto: CreateArticlesDto) {
    return this.articlesRepository.create(dto);
  }

  async findAllArticles(dto: GetArticlesDto) {
    return this.articlesRepository.findAll(dto);
  }

  async findAllArticlesByProject(dto: GetArticlesDto) {
    return this.articlesRepository.findArticlesByProjectUid(dto);
  }

  async findByIdArticle(id: string) {
    return this.articlesRepository.findByUid(id);
  }

  async updateArticle(id: string, dto: UpdateArticlesDto) {
    return this.articlesRepository.update(id, dto);
  }

  async removeArticle(uid: string) {
    return this.articlesRepository.remove(uid);
  }
}
