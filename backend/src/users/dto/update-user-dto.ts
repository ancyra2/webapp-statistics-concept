import { OmitType, PartialType } from '@nestjs/swagger';
import { createUserDto } from './create-user-dto';

export class UpdateUserDto extends OmitType(PartialType(createUserDto), [
  'id',
] as const) {}
