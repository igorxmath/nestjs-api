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

  async signin(credentials: SignInDto): Promise<{ access_token: string }> {
    const { email, password } = credentials;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
    return this.generateToken(user.id, user.email, user.role);
  }

  async signup(data: SignUpDto): Promise<{ access_token: string }> {
    const { name, email, password } = data;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    try {
      const user = await this.userRepository.create(name, email, hashPassword);
      return this.generateToken(user.id, user.email, user.role);
    } catch (error) {
      throw new HttpException(
        'Error during user creation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async generateToken(
    id: string,
    email: string,
    role: 'ADMIN' | 'USER',
  ): Promise<{ access_token: string }> {
    const payload = { sub: id, email, role };
    const secret = this.configService.get('JWT_SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });

    return { access_token };
  }
}
