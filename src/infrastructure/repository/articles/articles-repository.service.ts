import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ArticlesEntity } from '../../../app/articles/entities/articles.entity';
import { left, right } from '@sweet-monads/either';
import { AppError } from '../../../common/error/app-error';
import { ProjectArticlesEntity } from '../../../app/projects/entities/project-articles.entity';
import { ProjectsEntity } from '../../../app/projects/entities/projects.entity';
import { UserArticlesEntity } from '../../../app/user/entities/user-articles.entity';
import { UserEntity } from '../../../app/user/entities/user.entity';


@Injectable()
export class ArticlesRepositoryService {
  constructor(
    @InjectRepository(ArticlesEntity)
    private articlesRepository: Repository<ArticlesEntity>,
    @InjectRepository(UserArticlesEntity)
    private userArticlesRepository: Repository<UserArticlesEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProjectArticlesEntity)
    private projectArticlesRepository: Repository<ProjectArticlesEntity>,
    @InjectRepository(ProjectsEntity)
    private projectRepository: Repository<ProjectsEntity>,
  ) {
  }

  async create(data) {
    data.uid = uuidv4();
    try {
      const project = await this.projectRepository.findOne({ where: { uid: data.projects } });
      if (!project) {
        return left('Project not found');
      }
      const user = await this.userRepository.findOne({ where: { uid: data.user_id } });
      if (!user) {
        return left('Project not found');
      }

      const article = await this.articlesRepository.save(data);

      const dataPA = {
        uid: uuidv4(),
        project_id: project.id,
        article_id: article.id,
      };
      const dataUA = {
        uid: uuidv4(),
        user_id: user.id,
        article_id: article.id,
        project_id: project.id,
      };


      await this.projectArticlesRepository.save(dataPA);
      await this.userArticlesRepository.save(dataUA);

      return right(article);
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }

  // async findAll(data) {
  //   try {
  //
  //     const page = parseInt(data.page, 10);
  //     const limit = parseInt(data.limit, 10);
  //     // const { page, limit } = data;
  //     const [results, total] = await this.articlesRepository.find({
  //       skip: (page - 1) * limit,
  //       take: limit,
  //     });
  //     return right([results, total]);
  //   } catch (err) {
  //     return left(new AppError(`${err.message}`));
  //   }
  // }

  async findByUid(uid: string) {
    try {
      const article = await this.articlesRepository.findOne({ where: { uid: uid } });
      if (!article) {
        return left(new AppError('Article not found'));
      }
      return right(article);
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }


  async findArticlesByProjectUid(data) {
    try {
      const project = await this.projectRepository.findOne({ where: { uid: data.uid } });
      if (!project) {
        return left(new AppError('Project not found'));
      }
      const articles = await this.articlesRepository
        .createQueryBuilder('t')
        .innerJoin(ProjectArticlesEntity, 'pa', 'pa.article_id = t.id' +
          ' and pa.project_id = :project_id', {
          'project_id': project.id
        })
        .select([
          't.id as id',
          't.uid as uid',
          't.theme as theme',
          't.titles as titles',
          't.words as words',
        ])
        .offset(data.skip)
        .limit(data.take)
        .getRawMany();
      return right(articles);
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }

  async findAll(data) {
    try {
      const user = await this.userRepository.findOne({ where: { uid: data.uid } });
      if (!user) {
        return left(new AppError('User not found'));
      }
      const project = await this.projectRepository.findOne({ where: { uid: data.projects } });
      if (!project) {
        return left('Project not found');
      }
      const articles = await this.articlesRepository
        .createQueryBuilder('t')
        .innerJoin(UserArticlesEntity, 'ua', 'ua.article_id = t.id' +
          ' and ua.user_id = :user_id', {
          'user_id': user.id,
          'project_id': project.id
        })
        .leftJoinAndSelect(ProjectsEntity, 'p', 'ua.project_id = p.id')
        .select([
          't.id as id',
          't.uid as uid',
          't.theme as theme',
          't.titles as titles',
          't.words as words',
          't.text as text',
          'p.name as project_name',
          'p.uid as project_uid',
        ])
        .orderBy('t.created_at', 'ASC')
        .offset(data.skip)
        .limit(data.take)
        .getRawMany();


      return right(articles);
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }


  async update(uid: string, dto) {
    try {
      const article = await this.articlesRepository.findOne({ where: { uid: uid } });
      if (!article) {
        return left(new AppError('Article not found'));
      }
      const mergedProvider = this.articlesRepository.merge(article, dto);
      return right(this.articlesRepository.save(mergedProvider));
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }

  async remove(uid: string) {
    try {
      const article = await this.articlesRepository.findOne({ where: { uid: uid } });
      if (!article) {
        return left(new AppError('Article not found'));
      }
      const projectArticles = await this.projectArticlesRepository.findOne({ where: { article_id: article.id } });
      if (!projectArticles) {
        return left(new AppError('Project not found'));
      }
      const userArticles = await this.userArticlesRepository.findOne({ where: { article_id: article.id } });
      if (!userArticles) {
        return left(new AppError('User Articles Column not found'));
      }
      await this.projectArticlesRepository.delete(projectArticles.id);
      await this.userArticlesRepository.delete(userArticles.id);

      return right(this.articlesRepository.delete(article.id));
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }
}
