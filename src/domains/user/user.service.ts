import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  fetchUser(userId: string) {
    return this.userRepository.findOneOrFail(userId);
  }

  fetchUsersArticles(userId: string) {
    return this.userRepository.findOne(userId, {
      relations: ['articles'],
    });
  }
}
