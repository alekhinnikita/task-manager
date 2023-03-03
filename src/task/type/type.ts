import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { TaskType } from 'src/entities/task/task-Type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, TaskType])],
  providers: [],
  controllers: [],
})
export class TypeModule {}
