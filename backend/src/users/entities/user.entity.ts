import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IEntity } from './entity.interface';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User implements IEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number;

  @Column()
  @ApiProperty({ example: 'istanbul', description: 'The username of the user' })
  username: string;

  @Column()
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string;

  @Column()
  @ApiProperty({
    example: 'useremail@example.com',
    description: 'The email of the user',
  })
  email: string;

  @Column('simple-array')
  @ApiProperty({
    example: ['admin', 'user'],
    description: 'The roles of the user',
  })
  roles: string[];

  @Column('simple-array')
  @ApiProperty({
    example: ['read', 'write'],
    description: 'The permissions of the user',
  })
  permissions: string[];

  @CreateDateColumn()
  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The creation date of the user',
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2023-01-02T00:00:00Z',
    description: 'The last update date of the user',
  })
  updated_at: Date;

  @DeleteDateColumn()
  @ApiProperty({
    example: '2023-01-03T00:00:00Z',
    description: 'The deletion date of the user',
  })
  deleted_at: Date;
}
