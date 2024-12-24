import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    const uploadsDir = this.configService.get<string>('UPLOADS_DIR');
    const maxFileSize = this.configService.get<number>('MAX_FILE_SIZE');
    const allowedMimeTypes = this.configService
      .get<string>('ALLOWED_MIME_TYPES')
      ?.split(',');

    return {
      storage: diskStorage({
        destination: uploadsDir,
        filename: (req, file, callback) => {
          const uniqueName = this.generateUniqueName(file.originalname);
          callback(null, uniqueName);
        },
      }),
      limits: {
        fileSize: maxFileSize,
      },
      fileFilter: (req, file, callback) => {
        if (allowedMimeTypes?.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Not valid file extension'), false);
        }
      },
    };
  }

  generateUniqueName(orignalName: string): string {
    const randomString = Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now();
    const fileExtension = orignalName.split('.').pop();
    return `${randomString}-${timestamp}.${fileExtension}`;
  }
}
