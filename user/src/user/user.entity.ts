import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserInterface } from './user.interface';
import { Min } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Min(8)
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, 10);
  }
}
