import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsDto } from './dto/get-projects.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectsController {

  constructor(
    private projectsService: ProjectsService
  ) {
  }


  @Post()
  async createProject(@Body() dto: CreateProjectDto) {
    return this.projectsService.createProject(dto);
  }

  @Get()
  async getAllProject(@Query(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true
    })
  ) dto: GetProjectsDto) {
    return this.projectsService.findAllProjects(dto);
  }

  @Get(':id')
  async getProject(@Param('id') id: string) {
    return this.projectsService.findByIdProject(id);
  }

  // @Get('/project_id')
  // async delete(@Param('project_id') project_id: number) {
  //   return this.projectsService.delete(project_id);
  // }

  @Patch(':id')
  async updateProject(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.updateProject(id, dto);
  }

  @Delete(':id')
  async removeProject(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
