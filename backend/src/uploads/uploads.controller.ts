import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { Express } from 'express';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/constant';
import { ApiOperation, ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { ImagesService } from '../images/images.service';
import { CreateImageDto } from '../images/dto/create-image.dto';

@Controller('uploads')
@Public()
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly imageService: ImagesService,
  ) {}

  @Post('upload')
  @ApiTags('Uploads')
  @ApiOperation({ summary: 'Dosya yüklemesi yapar ve veritabanına kaydeder.' })
  @ApiConsumes('multipart/form-data') // Dosya yükleme için form verisi
  @ApiBody({
    description: 'Dosya yüklemesi ve resim bilgileri için gerekli alan',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Yüklenecek dosya',
        },
        alt: {
          type: 'string',
          description: 'Resim alt metni',
          example: 'A beautiful sunrise over the mountains',
        },
        caption: {
          type: 'string',
          description: 'Resim açıklaması',
          example: 'Sunrise in the Alps',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
  ) {
    const filePath = `public/uploads/${file.filename}`;
    const image = {
      ...createImageDto,
      url: filePath,
    };
    const savedImage = await this.imageService.create(image);

    return {
      message: 'File successfully uploaded and saved to database',
      data: savedImage,
    };
  }
}
