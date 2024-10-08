import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CreateSubCategoryDto {
  @ApiProperty({ description: 'The unique identifier of the category' })
  name: string;

  @ApiProperty({
    type: () => Category,
    description: 'The category this subcategory belongs to',
  })
  category_id: number;
}
