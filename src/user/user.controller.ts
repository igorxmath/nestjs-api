import { Controller } from '@nestjs/common';
import { Get, Delete, Patch, UseGuards, Body } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUser(@GetUser() user: { id: string; email: string }) {
    return user;
  }

  @Patch()
  async updateUser(
    @GetUser() { id }: { id: string },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete()
  async deleteUser(@GetUser() { id }: { id: string }) {
    return await this.userService.delete(id);
  }
}
