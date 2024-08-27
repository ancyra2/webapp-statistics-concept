import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ){}
  
  async create(createCatDto: CreateCatDto): Promise<Cat>{
    const cat = this.catsRepository.create(createCatDto);
    return await this.catsRepository.save(cat);
  }

  async findAll(): Promise<Cat[]>{
    return this.catsRepository.find()
  }

  async findOne(id: number) {
    const cat = await this.catsRepository.findOneBy({id});
    if (!cat) {
      throw new Error(`Cat with id ${id} not found`); 
    }
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    await this.catsRepository.update(id, updateCatDto);
    return this.findOne(id); 
  }

  async remove(id: number): Promise<void> {
    const result = await this.catsRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Cat with id ${id} not found`); 
    }
  }
}
