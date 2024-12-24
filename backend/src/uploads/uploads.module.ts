import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer-config.service';

@Module({
  imports: [
    ConfigModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MulterConfigService,
    }),
  ],
  controllers: [UploadsController],
  providers: [UploadsService, MulterConfigService],
})
export class UploadsModule {}
