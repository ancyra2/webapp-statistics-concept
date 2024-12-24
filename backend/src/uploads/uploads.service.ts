import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/upload-file.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';

@Injectable()
export class UploadsService {
  findAll() {
    return `This action returns all uploads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
