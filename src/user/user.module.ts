import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from 'src/database/repositories/user.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule],
  providers: [UserRepository, UserService]
})
export class UserModule {}
