import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Name: string;

  @Column()
  Password: string;

  @Column()
  Email: string;

  @Column('simple-array')
  Roles: string[];

  @Column('simple-array')
  Permissions: string[];

  @CreateDateColumn()
  Created_at: Date;

  @UpdateDateColumn()
  Updated_at: Date;

  @DeleteDateColumn()
  Deleted_at: Date;
}
