import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number;

  @ApiProperty({ example: 'istanbul', description: 'The username of the user' })
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string;

  @ApiProperty({
    example: 'useremail@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: ['admin', 'user'],
    description: 'The roles of the user',
  })
  roles: string[];

  @ApiProperty({
    example: ['read', 'write'],
    description: 'The permissions of the user',
  })
  permissions: string[];

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The creation date of the user',
  })
  created_at: Date;

  @ApiProperty({
    example: '2023-01-02T00:00:00Z',
    description: 'The last update date of the user',
  })
  updated_at: Date;

  @ApiProperty({
    example: '2023-01-03T00:00:00Z',
    description: 'The deletion date of the user',
  })
  deleted_at: Date;
}
