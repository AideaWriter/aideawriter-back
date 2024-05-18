import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import postgresConnectionOptions from './orm.config';
@Module({
  imports: [TypeOrmModule.forRoot(postgresConnectionOptions)],
})
export class DatabaseModule {}
