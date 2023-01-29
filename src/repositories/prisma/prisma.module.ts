import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from '../user-repository';
import { PrismaUserRepository } from './prisma-user-repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class PrismaModule {}
