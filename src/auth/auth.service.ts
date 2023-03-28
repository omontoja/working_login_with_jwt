import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = {
      sub: user.registrationnumber,
      username: user.username,
      role: user.roles,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(registrationnumber: number, password: string) {
    let user: User;
    try {
      user = await this.userService.findOne(registrationnumber);
    } catch (error) {
      return null;
    }

    const isPasswordValid = await compareSync(password, user[0].password);
    if (isPasswordValid !== null) return user;

    return user;
  }
}
