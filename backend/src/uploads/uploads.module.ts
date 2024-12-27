import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer-config.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [
    ConfigModule,
    ImagesModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MulterConfigService,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public', 'uploads'),
      serveRoot: '/public/uploads',
    }),
  ],
  controllers: [UploadsController],
  providers: [UploadsService, MulterConfigService],
})
export class UploadsModule {}
