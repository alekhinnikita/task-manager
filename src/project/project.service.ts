import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDTO, UpdateProjectDTO } from './models';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    @InjectRepository(Project)
    private projectRep: Repository<Project>,
  ) {}

  getAll(): Promise<Project[]> {
    return this.projectRep.find();
  }

  getById(id: number): Promise<Project> {
    return this.projectRep.findOneByOrFail({ id: id });
  }

  async create(dto: CreateProjectDTO): Promise<Project> {
    if (await this.projectRep.findOneBy({ name: dto.name })) {
      throw new BadRequestException();
    }
    const user = await this.userRep.findOneByOrFail({ id: dto.headId });
    const project = this.projectRep.create({
      name: dto.name,
      code: dto.code,
      description: dto.description,
      head: user,
    });
    try {
      return this.projectRep.save(project);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async update(dto: UpdateProjectDTO): Promise<Project> {
    const project = await this.projectRep.findOneByOrFail({
      id: dto.projectId,
    });
    if (dto.name !== undefined) {
      project.name = dto.name;
    }
    if (dto.description !== undefined) {
      project.description = dto.description;
    }
    if (dto.headId !== undefined) {
      const user = await this.userRep.findOneByOrFail({ id: dto.headId });
      project.head = user;
    }
    try {
      return this.projectRep.save(project);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async addUser(projectId: number, userId: number): Promise<HttpStatus> {
    const project = await this.projectRep.findOneOrFail({
      relations: { users: true },
      where: { id: projectId },
    });
    const user = await this.userRep.findOneByOrFail({ id: userId });
    if (project.users.filter((u) => u.id === user.id)) {
      return HttpStatus.OK;
    }
    project.users.push(user);
    try {
      this.projectRep.save(project);
      return HttpStatus.OK;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async removeUser(projectId: number, userId: number): Promise<HttpStatus> {
    const project = await this.projectRep.findOneOrFail({
      relations: { users: true },
      where: { id: projectId },
    });
    const user = await this.userRep.findOneByOrFail({ id: userId });
    if (project.users.filter((u) => u.id !== user.id)) {
      throw new BadRequestException();
    }
    project.users = project.users.filter((u) => u.id !== user.id);
    try {
      this.projectRep.save(project);
      return HttpStatus.OK;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
