import { RefreshTokenGuard } from 'src/user/guard/refreshToken.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/user/guard/AccessTokenGuard.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return await this.authService.signup(signUpDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@GetUser() { id }: { id: string }) {
    return await this.authService.logout(id);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@GetUser() user: { id: string; refreshToken: string }) {
    return await this.authService.refreshTokens(user.id, user.refreshToken);
  }
}
