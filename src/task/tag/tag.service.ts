import {
  Body,
  Delete,
  Get,
  Injectable,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { TaskTag } from 'src/entities/task/task-tag.entity';
import { Repository } from 'typeorm';
import { CreateTaskTagDTO, UpdateTaskTagDTO } from './models';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Project)
    private projectRep: Repository<Project>,
    @InjectRepository(TaskTag)
    private tagsRep: Repository<TaskTag>,
  ) {}

  @Get('project/:id')
  getAllForProject(@Param('id') projectId: number) {
    return this.tagsRep.find({
      relations: { project: true },
      where: { project: { id: projectId } },
    });
  }

  @Get(':id')
  getOneById(@Param('id') id: number) {
    return this.tagsRep.find({
      relations: { project: true },
      where: { id: id },
    });
  }

  @Post()
  async create(@Body() dto: CreateTaskTagDTO) {
    const project = await this.projectRep.findOneByOrFail({
      id: dto.projectId,
    });
    const tag = this.tagsRep.create({
      project: project,
      name: dto.name,
      description: dto.description,
    });
    try {
      return this.tagsRep.save(tag);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Put()
  async update(@Body() dto: UpdateTaskTagDTO) {
    const tag = await this.tagsRep.findOneByOrFail({ id: dto.id });
    if (dto.name) tag.name = dto.name;
    if (dto.description) tag.description = dto.description;
    try {
      return this.tagsRep.save(tag);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async remove(@Param(':id') id: number) {
    const tag = await this.tagsRep.findOneByOrFail({ id: id });
    try {
      return this.tagsRep.remove(tag);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
