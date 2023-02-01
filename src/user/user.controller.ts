import { Controller } from '@nestjs/common';
import { Get, Delete, Patch, UseGuards, Body } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
// import { Roles } from './decorators/roles.decorator';
// import { RolesGuard } from 'src/user/guard/roles.guard';
// @Roles('ADMIN')
// @UseGuards(RolesGuard)

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUser(@GetUser() user: { id: string; email: string }) {
    return user;
  }

  @Patch()
  updateUser(
    @GetUser() { id }: { id: string },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete()
  deleteUser(@GetUser() { id }: { id: string }) {
    return this.userService.delete(id);
  }
}
