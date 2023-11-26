import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOptionsWhere, InsertResult, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOne(query: FindOptionsWhere<User>): Promise<User> {
    return this.userRepository.findOne({ where: query });
  }

  async createUser(user: any): Promise<InsertResult> {
    try {
      const userEntity = this.userRepository.create(user);

      const res = await this.userRepository.insert(userEntity);

      Logger.log('User has been created!');

      return res;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }
}
