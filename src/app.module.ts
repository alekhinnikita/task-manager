import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Component } from './entities/component.entity';
import { Department } from './entities/department.entity';
import { Issue } from './entities/issue.entity';
import { Position } from './entities/position.entity';
import { Project } from './entities/project.entity';
import { TaskPriority } from './entities/task/task-priority.entity';
import { TaskResolution } from './entities/task/task-resolution.entity';
import { TaskStatus } from './entities/task/task-status.entity';
import { TaskTag } from './entities/task/task-tag.entity';
import { TaskType } from './entities/task/task-type.entity';
import { Task } from './entities/task/task.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'task_manager',
      synchronize: true,
      entities: [
        User,
        Department,
        Position,
        Project,
        Component,
        Issue,
        Task,
        TaskTag,
        TaskType,
        TaskStatus,
        TaskPriority,
        TaskResolution,
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
