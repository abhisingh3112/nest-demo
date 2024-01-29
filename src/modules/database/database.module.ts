import { Module } from '@nestjs/common';
import { databaseProviders } from '../config/database.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
