import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user';
import { CreateAuthDto } from './dto/create-auth.dto';

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

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
