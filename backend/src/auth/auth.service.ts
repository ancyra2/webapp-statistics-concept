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
    const user = await this.usersService.findOnebyName(userName);
    if (user?.Password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { userName: user.Name, sub: user.Id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
