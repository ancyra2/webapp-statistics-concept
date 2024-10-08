import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { SubCategory } from './entities/subcategory.entity';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Category with id ${id} not found`);
    }
  }

  async createSubCategory(
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    const subCategory = this.subCategoryRepository.create(createSubCategoryDto);
    return await this.subCategoryRepository.save(subCategory);
  }

  async findAllSubCategories(): Promise<SubCategory[]> {
    return this.subCategoryRepository.find();
  }

  async findSubCategory(id: number): Promise<SubCategory> {
    const subCategory = await this.subCategoryRepository.findOneBy({ id });
    if (!subCategory) {
      throw new Error(`SubCategory with id ${id} not found`);
    }
    return subCategory;
  }

  async findSubCategoriesByCategoryId(
    categoryId: number,
  ): Promise<SubCategory[]> {
    const subcategories = await this.subCategoryRepository.find({
      where: { category: { id: categoryId } },
    });
    if (!subcategories) {
      throw new Error(`SubCategories with categoryId ${categoryId} not found`);
    }
    return subcategories;
  }

  async updateSubCategory(
    id: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    await this.subCategoryRepository.update(id, updateSubCategoryDto);
    return this.findOne(id);
  }

  async updateSubCategoryByCategoryId(category_id: number) {
    const subcategories = await this.findSubCategoriesByCategoryId(category_id);
    if (!subcategories) {
      throw new Error(`SubCategories with categoryId ${category_id} not found`);
    }
    for (const subCategory of subcategories) {
      await this.subCategoryRepository.update(
        subCategory.id,
        UpdateSubCategoryDto,
      );
    }
  }

  async removeSubCategory(id: number) {
    const result = await this.subCategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`SubCategory with id ${id} not found`);
    }
  }
}
