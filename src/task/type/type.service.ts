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
import { TaskType } from 'src/entities/task/task-Type.entity';
import { Repository } from 'typeorm';
import { CreateTaskTypeDTO, UpdateTaskTypeDTO } from './models';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Project)
    private projectRep: Repository<Project>,
    @InjectRepository(TaskType)
    private TypesRep: Repository<TaskType>,
  ) {}

  @Get('project/:id')
  getAllForProject(@Param('id') projectId: number) {
    return this.TypesRep.find({
      relations: { project: true },
      where: { project: { id: projectId } },
    });
  }

  @Get(':id')
  getOneById(@Param('id') id: number) {
    return this.TypesRep.find({
      relations: { project: true },
      where: { id: id },
    });
  }

  @Post()
  async create(@Body() dto: CreateTaskTypeDTO) {
    const project = await this.projectRep.findOneByOrFail({
      id: dto.projectId,
    });
    const Type = this.TypesRep.create({
      project: project,
      name: dto.name,
      description: dto.description,
    });
    try {
      return this.TypesRep.save(Type);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Put()
  async update(@Body() dto: UpdateTaskTypeDTO) {
    const Type = await this.TypesRep.findOneByOrFail({ id: dto.id });
    if (dto.name) Type.name = dto.name;
    if (dto.description) Type.description = dto.description;
    try {
      return this.TypesRep.save(Type);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async remove(@Param(':id') id: number) {
    const Type = await this.TypesRep.findOneByOrFail({ id: id });
    try {
      return this.TypesRep.remove(Type);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
