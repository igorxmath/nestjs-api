import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(credentials: SignInDto) {
    const { email, password } = credentials;

    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    const { access_token, refresh_token } = await this.generateTokens(
      user.id,
      user.email,
      user.role,
    );

    await this.updateUserRefreshToken(user.id, refresh_token);

    return { access_token, refresh_token };
  }

  async signup(data: SignUpDto) {
    const { name, email, password } = data;
    const existingUser = await this.userRepository.findOneByEmail(email);
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));

    const user = await this.userRepository.create(name, email, hashPassword);
    const { access_token, refresh_token } = await this.generateTokens(
      user.id,
      user.email,
      user.role,
    );
    await this.updateUserRefreshToken(user.id, refresh_token);

    return { access_token, refresh_token };
  }

  async logout(id: string) {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.update(id, { refreshToken: null });

    return { message: 'Logout successfully' };
  }

  async refreshTokens(id: string, refreshToken: string) {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isRefreshTokenMatching = refreshToken === user.refreshToken;
    if (!isRefreshTokenMatching) {
      throw new HttpException(
        'Incorrect refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { access_token, refresh_token } = await this.generateTokens(
      user.id,
      user.email,
      user.role,
    );

    await this.updateUserRefreshToken(user.id, refresh_token);

    return { access_token, refresh_token };
  }

  private async generateTokens(id: string, email: string, role: string) {
    const payload = { sub: id, email, role };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '10m',
        secret: process.env.JWT_SECRET,
      }),

      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    ]);

    return { access_token, refresh_token };
  }

  private async updateUserRefreshToken(id: string, refreshToken: string) {
    await this.userRepository.update(id, { refreshToken });
  }
}
