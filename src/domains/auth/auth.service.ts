import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { CreateAuthDto } from './dto/create-auth.dto';
import { deleteUser } from 'src/utils/deleteUser';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(uid: string, createAuthDto: CreateAuthDto) {
    this.userRepository.save({ id: uid, name: createAuthDto.name });

    return null;
  }

  findUser(uid: string) {
    return this.userRepository.findOne(uid);
  }

  async delete(uid: string) {
    await deleteUser(uid);
    await this.userRepository.softDelete(uid);

    return null;
  }
}
