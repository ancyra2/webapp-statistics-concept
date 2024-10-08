import { ApiProperty } from '@nestjs/swagger';
import { SubCategory } from '../entities/subcategory.entity';

export class CreateCategoryDto {
  @ApiProperty({ description: 'The name of the category' })
  name: string;

  @ApiProperty({
    type: () => [SubCategory],
    description: 'The subcategories of the category',
  })
  subcategories?: SubCategory[];
}
