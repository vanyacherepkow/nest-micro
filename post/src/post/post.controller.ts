import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  async findAll(): Promise<PostEntity[]> {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<PostEntity> {
    return await this.postService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.create(post);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: PostEntity,
  ): Promise<PostEntity> {
    return await this.postService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.postService.remove(id);
  }
}
