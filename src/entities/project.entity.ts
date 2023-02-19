import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  code: string;
  @Column()
  description: string;
  @ManyToOne(() => User)
  head: User;
  @ManyToMany(() => User)
  @JoinTable({ name: 'projects_users' })
  users: User[];
}
