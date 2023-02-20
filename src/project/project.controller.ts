import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProjectDTO, UpdateProjectDTO } from './models';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectSer: ProjectService) {}

  @Get()
  getAll() {
    return this.projectSer.getAll();
  }

  @Get(':id')
  getById(@Param(':id') id) {
    return this.projectSer.getById(id);
  }

  @Post()
  create(@Body() dto: CreateProjectDTO) {
    return this.projectSer.create(dto);
  }

  @Put()
  update(@Body() dto: UpdateProjectDTO) {
    return this.projectSer.update(dto);
  }

  @Post('users/:projectId/:userId')
  addUser(
    @Param('projectId') projectId: number,
    @Param('userId') userId: number,
  ) {
    return this.projectSer.addUser(projectId, userId);
  }

  @Delete('users/:projectId/:userId')
  removeUser(
    @Param('projectId') projectId: number,
    @Param('userId') userId: number,
  ) {
    return this.projectSer.removeUser(projectId, userId);
  }
}
