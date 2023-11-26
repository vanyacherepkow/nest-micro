import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async findOne(query: FindOptionsWhere<PostEntity>): Promise<PostEntity> {
    return this.postRepository.findOne({ where: query });
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }

  async create(data: PostEntity): Promise<PostEntity> {
    const newsItem = this.postRepository.create(data);
    return await this.postRepository.save(newsItem);
  }

  async update(id: number, data: PostEntity): Promise<PostEntity> {
    await this.postRepository.update(id, data);
    return this.findOne({ id });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.postRepository.delete(id);
    return { message: `Новость с id ${id} удалена` };
  }
}
