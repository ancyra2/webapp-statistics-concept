import { SubCategory } from '../entities/subcategory.entity';

export class CreateCategoryDto {
  name: string;
  subcategories?: SubCategory[];
}
