import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/category.dto';
import { Category } from 'src/products/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async findOne(id: Category['id']): Promise<Category> {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`the category with the ${id} doesnt exist`);
    }
    return category;
  }

  create(data: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: Category['id'], data: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    this.categoryRepo.merge(category, data);

    return this.categoryRepo.save(category);
  }

  delete(id: Category['id']) {
    return this.categoryRepo.delete(id);
  }
}
