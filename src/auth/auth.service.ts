import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signin({ email, password }: SignInDto) {
    const user = await this.userRepository.find(email);
    const isMatched = await bcrypt.compare(password, user.password);
    if (user && isMatched) {
      return this.token(user.id, email);
    }
  }

  async signup({ name, email, password }: SignUpDto) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.userRepository.create(name, email, hashedPassword);
    return this.token(user.id, email);
  }

  async token(id: string, email: string): Promise<{ access_token: string }> {
    const payload = { sub: id, email };
    const secret = this.configService.get('JWT_SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    return { access_token };
  }
}
