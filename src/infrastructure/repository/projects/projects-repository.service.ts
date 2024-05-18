import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { left, right } from '@sweet-monads/either';
import { AppError } from '../../../common/error/app-error';
import { ProjectsEntity } from '../../../app/projects/entities/projects.entity';
import { UserProjectEntity } from '../../../app/user/entities/user-project.entity';
import { UserEntity } from '../../../app/user/entities/user.entity';
import { ProjectArticlesEntity } from '../../../app/projects/entities/project-articles.entity';
import { ArticlesEntity } from '../../../app/articles/entities/articles.entity';

@Injectable()
export class ProjectRepositoryService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private projectRepository: Repository<ProjectsEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ArticlesEntity)
    private articlesRepository: Repository<ArticlesEntity>,
    @InjectRepository(UserProjectEntity)
    private userProjectRepository: Repository<UserProjectEntity>,
    @InjectRepository(ProjectArticlesEntity)
    private projectArticlesRepository: Repository<ProjectArticlesEntity>,
  ) {
  }


  async create(data) {
    try {
      const user = await this.userRepository.findOne({ where: { uid: data.user } });
      if (!user) {
        return left('User not found');
      }
      data.uid = uuidv4();
      const project = await this.projectRepository.save(data);

      const dataUP = {
        uid: uuidv4(),
        user_id: user.id,
        project_id: project.id,
      };
      await this.userProjectRepository.save(dataUP);
      return right(project);
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }

  // async findAll(data) {
  //   try {
  //     const { page, limit } = data;
  //     const [results, total] = await this.projectRepository.find({
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
      const project = await this.projectRepository.findOne({ where: { uid: uid } });
      if (!project) {
        return left(new AppError('Project not found'));
      }
      return right(project);
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
      const projects = await this.projectRepository
        .createQueryBuilder('t')
        .innerJoin(UserProjectEntity, 'up', 'up.project_id = t.id' +
          ' and up.user_id = :user_id', {
          'user_id': user.id
        })
        .select([
          't.uid as uid',
          't.name as name',
        ])
        .offset(data.skip)
        .limit(data.take)
        .getRawMany();
      return right(projects);
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }


  async update(uid: string, dto) {
    try {
      const project = await this.projectRepository.findOne({ where: { uid: uid } });
      if (!project) {
        return left(new AppError('Project not found'));
      }
      const mergedProvider = this.projectRepository.merge(project, dto);
      return right(this.projectRepository.save(mergedProvider));
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }

  // async delete(project_id: number) {
  //   try {
  //     const project = await this.projectArticlesRepository.find({ where: { project_id: project_id } });
  //     if (!project) {
  //       return left(new AppError('Project not found'));
  //     }
  //     console.log(project);
  //     // project.map((item) => {
  //     //   this.projectArticlesRepository.delete(item.id);
  //     // });
  //     return right(project);
  //   } catch (err) {
  //     return left(new AppError(`${err.message}`));
  //   }
  // }


  async remove(uid: string) {
    try {
      const project = await this.projectRepository.findOne({ where: { uid: uid } });
      if (!project) {
        return left(new AppError('Project not found'));
      }
      const userProject = await this.userProjectRepository.findOne({ where: { project_id: project.id } });
      if (!userProject) {
        return left(new AppError('Project not found'));
      }


      const projectArticle = await this.projectArticlesRepository.find({ where: { project_id: project.id } });
      projectArticle.map(async (item) => {
        const articles = await this.articlesRepository.findOne({ where: { id: item.article_id } });
        await this.articlesRepository.delete(articles.id);
        await this.projectArticlesRepository.delete(item.id);
      });

      await this.userProjectRepository.delete(userProject.id);
      return right(this.projectRepository.delete(project.id));
    } catch (err) {
      return left(new AppError(`${err.message}`));
    }
  }
}
