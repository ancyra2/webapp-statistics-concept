import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
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
}
