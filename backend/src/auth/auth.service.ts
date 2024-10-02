import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    userName: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(userName);
    if (user?.userPassword !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { userName: user.userName, sub: user.userId };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
