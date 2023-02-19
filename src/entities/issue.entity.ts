import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Component } from './component.entity';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @ManyToOne(() => Project)
  project: Project;
  @ManyToOne(() => User)
  user: User;
  @ManyToMany(() => Component)
  component: Component;
}
