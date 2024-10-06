import { Injectable, LoggerService } from '@nestjs/common';
import { UserLogger } from '../entities/user-logger.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserLoggerService implements LoggerService {
  constructor(
    @InjectRepository(UserLogger)
    private userLoggerRepository: Repository<UserLogger>,
  ) {}
  log(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
    const userLogger = this.userLoggerRepository.create({
      userId: optionalParams[0].id,
      ipAddress: 'no ip adress',
      level: 'log',
      message: message,
      timestamp: optionalParams[0].timestamp,
    });
    return this.userLoggerRepository.save(userLogger);
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(message, optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    console.warn(message, optionalParams);
  }
}
