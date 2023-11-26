import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'auth',
          port: 4000,
        },
      },
    ]),
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
