import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './repositories/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class AppModule {}
