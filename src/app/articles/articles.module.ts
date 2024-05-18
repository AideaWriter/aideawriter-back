import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesEntity } from './entities/articles.entity';
import { ArticlesRepositoryService } from '../../infrastructure/repository/articles/articles-repository.service';
import { ProjectArticlesEntity } from '../projects/entities/project-articles.entity';
import { ProjectsEntity } from '../projects/entities/projects.entity';
import { UserArticlesEntity } from '../user/entities/user-articles.entity';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticlesEntity,
      ProjectArticlesEntity,
      ProjectsEntity,
      UserArticlesEntity,
      UserEntity
    ])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepositoryService],
  exports: [ArticlesRepositoryService]
})
export class ArticlesModule {
}
