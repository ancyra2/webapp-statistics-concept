import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(userName);
    if (user?.userPassword === pass) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userPassword, ...result } = user;

    return result;
  }
}
