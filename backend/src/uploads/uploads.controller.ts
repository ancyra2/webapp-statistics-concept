import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/constant';
import { ApiOperation, ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller('uploads')
@Public()
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('upload')
  @ApiTags('Uploads')
  @ApiOperation({ summary: 'Dosya yüklemesi yapar.' })
  @ApiConsumes('multipart/form-data') // Dosya yükleme için form verisi
  @ApiBody({
    description: 'Dosya yüklemesi için gerekli alan',
    type: UploadFileDto,
    required: true,
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File succesfully uploaded',
      filePath: `public/uploads/${file.filename}`,
    };
  }
}
