import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findById(id);
    await this.userRepository.update(id, updateUserDto);
    return updateUserDto;
  }

  async delete(id: string) {
    await this.findById(id);
    await this.userRepository.delete(id);
    return { message: `User deleted ${id}` };
  }

  private async findById(id: string) {
    if (!(await this.userRepository.findOneById(id)))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
