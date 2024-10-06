import { Module } from '@nestjs/common';
import { UserLoggerService } from './services/user-logger.service';
import { UserLogger } from './entities/user-logger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserLogger])],
  providers: [UserLoggerService],
  exports: [UserLoggerService],
})
export class LoggingModule {}
