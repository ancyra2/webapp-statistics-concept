import { ApiProperty } from '@nestjs/swagger';

export class CreateSubCategoryDto {
  @ApiProperty({ description: 'The name of the subcategory' })
  name: string;
}
