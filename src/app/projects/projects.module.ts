import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectRepositoryService } from '../../infrastructure/repository/projects/projects-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { UserProjectEntity } from '../user/entities/user-project.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ProjectArticlesEntity } from './entities/project-articles.entity';
import { ArticlesEntity } from '../articles/entities/articles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectsEntity, UserProjectEntity, UserEntity, ProjectArticlesEntity, ArticlesEntity]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectRepositoryService],
  exports: [ProjectRepositoryService],
})
export class ProjectsModule {
}
