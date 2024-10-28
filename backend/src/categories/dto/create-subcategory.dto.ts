import { ApiProperty } from '@nestjs/swagger';

export class CreateSubCategoryDto {
  @ApiProperty({ description: 'The name of the subcategory' })
  name: string;

  @ApiProperty({
    description: 'The unique identifier of the category',
    example: 1,
  })
  category_id: number;
}
