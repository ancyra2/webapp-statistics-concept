import { Injectable } from '@nestjs/common';

export interface User {
  userId: number;
  userName: string;
  userPassword: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      userName: 'John',
      userPassword: 'Johnpassword',
    },
    {
      userId: 2,
      userName: 'Jones',
      userPassword: 'Jonesspassword',
    },
  ];

  async findOne(userName: string): Promise<User | undefined> {
    return this.users.find((user) => user.userName === userName);
  }
}
