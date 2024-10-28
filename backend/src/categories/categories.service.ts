import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.categoryRepository.find({ relations: ['subcategories'] });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['subcategories'],
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
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
      throw new NotFoundException(`Category with id ${id} not found`);
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
      throw new NotFoundException(`SubCategory with id ${id} not found`);
    }
    return subCategory;
  }

  async findSubCategoriesByCategoryId(
    categoryId: number,
  ): Promise<SubCategory[]> {
    return this.subCategoryRepository.find({
      where: { category: { id: categoryId } },
    });
  }

  async updateSubCategory(
    id: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    await this.subCategoryRepository.update(id, updateSubCategoryDto);
    return this.findSubCategory(id);
  }

  async updateSubCategoryByCategoryId(
    category_id: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    const subcategories = await this.findSubCategoriesByCategoryId(category_id);
    for (const subCategory of subcategories) {
      await this.subCategoryRepository.update(
        subCategory.id,
        updateSubCategoryDto,
      );
    }
  }

  async removeSubCategory(id: number) {
    const result = await this.subCategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SubCategory with id ${id} not found`);
    }
  }
}
