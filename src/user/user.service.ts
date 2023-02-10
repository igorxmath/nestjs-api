import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    await this.userRepository.update(user.id, updateUserDto);
    return updateUserDto;
  }

  async delete(id: string) {
    const user = await this.findById(id);
    if (user.role == 'ADMIN') {
      throw new HttpException('Cannot delete admin', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.delete(user.id);
    return { message: `User deleted ${user.id}` };
  }

  private async findById(id: string) {
    const user = await this.userRepository.findOneById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
