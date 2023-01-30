import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try {
      const user = await this.userRepository.find(email);
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        return this.token(user.id, email);
      } else throw new Error();
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async signup({ name, email, password }: SignUpDto) {
    const hashPassword = await bcrypt.hash(password, 12);
    try {
      const user = await this.userRepository.create(name, email, hashPassword);
      return this.token(user.id, email);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
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
