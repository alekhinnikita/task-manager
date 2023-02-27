import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Component } from '../component.entity';
import { Issue } from '../issue.entity';
import { Project } from '../project.entity';
import { User } from '../user.entity';
import { TaskPriority } from './task-priority.entity';
import { TaskResolution } from './task-resolution.entity';
import { TaskStatus } from './task-status.entity';
import { TaskTag } from './task-tag.entity';
import { TaskType } from './task-type.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @ManyToOne(() => Project)
  project: Project;
  @ManyToOne(() => User)
  author: User;
  @ManyToOne(() => User)
  executor: User;
  @Column()
  create: Date;
  @Column()
  start: Date;
  @Column()
  end: Date;
  @Column()
  complete: Date;
  //minutes
  @Column()
  time_cost: number;
  @ManyToMany(() => TaskTag)
  @JoinTable({ name: 'task_tags' })
  tags: TaskTag[];
  @ManyToOne(() => TaskType)
  type: TaskType;
  @ManyToOne(() => TaskStatus)
  status: TaskStatus;
  @ManyToOne(() => TaskPriority)
  priority: TaskPriority;
  @ManyToOne(() => TaskResolution)
  resolution: TaskResolution;
  @ManyToMany(() => Component)
  @JoinTable({ name: 'task_components' })
  components: Component[];
  @ManyToMany(() => Issue)
  @JoinTable({ name: 'task_issues'})
  issue: Issue;
}
