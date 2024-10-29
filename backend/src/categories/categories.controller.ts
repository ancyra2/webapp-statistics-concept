import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/constant';

@ApiExtraModels(
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
)
@ApiTags('Categories')
@Public()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  findAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  findOneCategory(@Param('id') id: string) {
    return this.categoriesService.findOneCategory(+id);
  }

  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  @Delete(':id')
  removeCategory(@Param('id') id: string) {
    return this.categoriesService.removeCategory(+id);
  }

  //Subcategories
  @Post(':category_id/subcategories')
  createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.categoriesService.createSubCategory(createSubCategoryDto);
  }

  @Get('/subcategories')
  findAllSubCategories() {
    return this.categoriesService.findAllSubCategories();
  }

  @Get(':category_id/subcategories')
  findSubCategoriesOfCategories(@Param('category_id') category_id: string) {
    return this.categoriesService.findSubCategoriesByCategoryId(+category_id);
  }

  @Patch(':category_id/subcategories')
  updateSubCategory(
    @Param('category_id') category_id: string,
    @Param('sub_category_id') sub_category_id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.categoriesService.updateSubCategory(
      +category_id,
      updateSubCategoryDto,
    );
  }
}
