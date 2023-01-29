import { User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { UserRepository } from '../user-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(name: string, email: string, password: string): Promise<User> {
    return await this.prisma.user.create({ data: { name, email, password } });
  }
  async find(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
