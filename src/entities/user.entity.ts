import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from './department.entity';
import { Position } from './position.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  birthday: Date;
  @Column({ unique: true })
  login: string;
  @Column()
  password: string;
  @ManyToOne(() => Department)
  department: Department;
  @ManyToOne(() => Position)
  position: Position;
}
