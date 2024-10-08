import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
//import { Roles } from '../authorization/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
//import { Role } from '../authorization/enums/role.enum';
import { UpdateUserDto } from './dto/update-user-dto';
//import { Permissions } from '../authorization/decorators/permissions.decorator';
//import { Permission } from '../authorization/enums/permission.enum';
import { UserLoggerService } from '../logging/services/user-logger.service';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiExtraModels(CreateUserDto, UpdateUserDto)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userLoggerService: UserLoggerService,
  ) {}

  @Post()
  //@Roles(Role.Admin)
  //@Permissions(Permission.ALL)
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.usersService.create(createUserDto);
    if (user) {
      this.userLoggerService.log('User created', user);
    }
    return user;
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all users.', type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
