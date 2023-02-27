import { Body, Get, Injectable, InternalServerErrorException, Param, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/entities/project.entity";
import { TaskTag } from "src/entities/task/task-tag.entity";
import { Repository } from "typeorm";

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
      where: { project: { id: projectId }},
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
  async create(@Body() dto) {
    const project =  await this.projectRep.findOneByOrFail({ id: dto.projectId });
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
}