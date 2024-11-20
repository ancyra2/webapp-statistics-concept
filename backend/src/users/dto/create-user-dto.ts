import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
}
