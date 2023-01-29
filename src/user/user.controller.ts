import { Controller } from '@nestjs/common';
import { Get, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetUser } from './decorator/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  @Get()
  getUser(@GetUser() user: { id: string; email: string }) {
    return user;
  }
}
