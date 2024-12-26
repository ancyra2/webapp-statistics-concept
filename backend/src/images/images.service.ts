import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}
  async create(createImageDto: CreateImageDto): Promise<Image> {
    const image = this.imageRepository.create(createImageDto);
    return await this.imageRepository.save(image);
  }

  async findAll(): Promise<Image[]> {
    const images = await this.imageRepository.find();
    return images;
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({
      where: { id },
    });
    if (!image) {
      throw new NotFoundException(`Image with id ${id} not found`);
    }
    return image;
  }

  async update(id: number, updateImageDto: UpdateImageDto): Promise<Image> {
    await this.imageRepository.update(id, updateImageDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.imageRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Image with id ${id} not found`);
    }
  }
}
