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
  @Post(':categoryId/subcategories')
  createSubCategory(
    @Param('categoryId') categoryId: string,
    @Body() createSubCategoryDto: CreateSubCategoryDto,
  ) {
    return this.categoriesService.createSubCategory(
      +categoryId,
      createSubCategoryDto,
    );
  }

  @Get('subcategories/all')
  findAllSubCategories() {
    return this.categoriesService.findAllSubCategories();
  }

  @Get(':categoryId/subcategories')
  findSubCategoriesOfCategories(@Param('categoryId') categoryId: string) {
    return this.categoriesService.findSubCategoriesByCategoryId(+categoryId);
  }

  @Patch(':categoryId/subcategories/:subCategoryId')
  updateSubCategory(
    @Param('categoryId') categoryId: string,
    @Param('subCategoryId') subCategoryId: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.categoriesService.updateSubCategory(
      +categoryId,
      +subCategoryId,
      updateSubCategoryDto,
    );
  }
}
