import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'get' })
  async getUser(data: any): Promise<User> {
    return this.userService.findOne({ username: data.username });
  }

  @Post('register')
  async create(@Request() req): Promise<any> {
    return this.userService.createUser(req.query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne({ id: id });
  }
}
