import { Controller } from '@nestjs/common';
import { Get, Delete, Patch, UseGuards, Body } from '@nestjs/common/decorators';
import { GetUser } from './decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { AccessTokenGuard } from './guard/AccessTokenGuard.guard';

@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUser(@GetUser() user: { id: string }) {
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
