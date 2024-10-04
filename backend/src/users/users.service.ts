import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersReporsitory: Repository<User>,
  ) {}

  async create(createUserDto: createUserDto): Promise<User> {
    const user = this.usersReporsitory.create(createUserDto);
    return await this.usersReporsitory.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersReporsitory.find();
  }

  async findOne(Id: number) {
    const user = await this.usersReporsitory.findOneBy({ Id });
    if (!user) {
      throw new Error(`User with id ${Id} not found`);
    }
    return user;
  }

  async findOnebyName(Name: string) {
    const user = await this.usersReporsitory.findOneBy({ Name });
    if (!user) {
      throw new Error(`User with name ${Name} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersReporsitory.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersReporsitory.delete(id);
    if (result.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
  }
}
