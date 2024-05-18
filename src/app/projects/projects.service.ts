import { Injectable } from '@nestjs/common';
import { ProjectRepositoryService } from '../../infrastructure/repository/projects/projects-repository.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsDto } from './dto/get-projects.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(readonly projectsRepository: ProjectRepositoryService) {
  }

  async createProject(dto: CreateProjectDto) {
    return this.projectsRepository.create(dto);
  }

  async findAllProjects(dto: GetProjectsDto) {
    return this.projectsRepository.findAll(dto);
  }

  async findByIdProject(id: string) {
    return this.projectsRepository.findByUid(id);
  }

  // async delete(project_id: number) {
  //   return this.projectsRepository.delete(project_id);
  // }

  async updateProject(id: string, dto: UpdateProjectDto) {
    return this.projectsRepository.update(id, dto);
  }

  async remove(uid: string) {
    return this.projectsRepository.remove(uid);
  }
}
