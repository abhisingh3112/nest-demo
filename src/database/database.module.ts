import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.provider';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [...databaseProviders, UserRepository],
  exports: [...databaseProviders, UserRepository],
})
export class DatabaseModule {}
