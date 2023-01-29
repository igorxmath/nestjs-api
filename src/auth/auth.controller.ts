import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return await this.authService.signup(signUpDto);
  }
}
