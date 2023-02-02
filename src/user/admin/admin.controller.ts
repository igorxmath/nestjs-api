import { Controller, ParseUUIDPipe } from '@nestjs/common';
import {
  Delete,
  Patch,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common/decorators';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guard/roles.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UserService } from '../user.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Roles('ADMIN')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user/admin')
export class AdminController {
  constructor(private userService: UserService) {}

  @Patch(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.delete(id);
  }
}
