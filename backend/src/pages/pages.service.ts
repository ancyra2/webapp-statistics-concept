import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  // Yeni bir sayfa oluşturma
  async create(createPageDto: CreatePageDto): Promise<Page> {
    const newPage = this.pageRepository.create(createPageDto);
    return await this.pageRepository.save(newPage);
  }

  // Tüm sayfaları listeleme
  async findAll(): Promise<Page[]> {
    return await this.pageRepository.find();
  }

  // Belirli bir sayfayı getirme
  async findOne(id: number): Promise<Page> {
    const page = await this.pageRepository.findOne({ where: { id } });
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  // Belirli bir sayfayı güncelleme
  async update(id: number, updatePageDto: UpdatePageDto): Promise<Page> {
    const page = await this.pageRepository.preload({
      id,
      ...updatePageDto,
    });
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return await this.pageRepository.save(page);
  }

  // Belirli bir sayfayı silme
  async remove(id: number): Promise<void> {
    const page = await this.findOne(id);
    await this.pageRepository.remove(page);
  }
}
