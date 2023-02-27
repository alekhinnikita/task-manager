import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { TaskTag } from 'src/entities/task/task-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, TaskTag])],
  providers: [],
  controllers: [],
})
export class TagModule {}
