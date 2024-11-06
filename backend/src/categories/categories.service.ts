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

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAllCategories() {
    return this.categoryRepository.find({ relations: ['subcategories'] });
  }

  async findOneCategory(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['subcategories'],
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findOneCategory(id);
  }

  async removeCategory(id: number) {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }

  async createSubCategory(
    categoryId: number,
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    try {
      const subCategory = this.subCategoryRepository.create({
        ...createSubCategoryDto,
        category,
      });

      return await this.subCategoryRepository.save(subCategory);
    } catch (error) {
      console.log('DTO: ', createSubCategoryDto);
      console.log('DB Error: ', error);
      throw error;
    }
  }

  async findAllSubCategories() {
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
    categoryId: number,
    subCategoryId: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id: subCategoryId, category: { id: categoryId } },
    });

    if (!subCategory) {
      throw new NotFoundException(
        `SubCategory with id ${subCategoryId} not found in category with id ${categoryId}`,
      );
    }
    try {
      await this.subCategoryRepository.update(
        subCategoryId,
        updateSubCategoryDto,
      );

      return this.findSubCategory(subCategoryId);
    } catch (error) {
      console.log('DTO: ', updateSubCategoryDto);
      console.log('DB Error: ', error);
      throw error;
    }
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
