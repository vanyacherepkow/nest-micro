import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'nest-micro',
      password: 'nest-micro',
      database: 'nest-micro',
      synchronize: true,
      entities: [User],
    }),
    UserModule,
  ],
})
export class AppModule {}
