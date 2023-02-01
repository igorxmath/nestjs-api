import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AdminController } from './admin/admin.controller';

@Module({
  controllers: [UserController, AdminController],
  providers: [UserService],
})
export class UserModule {}
