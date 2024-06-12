import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/category.dto';
import { Category } from 'src/products/entities/category.entity';

@Injectable()
export class CategoryService {
  private idCounter = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'categoria 1',
      description: 'esta es mi nueva categoria',
    },
  ];

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: Category['id']): Category {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException(`the category with the ${id} doesnt exist`);
    }
    return category;
  }

  private findIndex(id: Category['id']) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new NotFoundException(`the category with the ${id} doesnt exist`);
    }
    return index;
  }

  create(data: CreateCategoryDto): Category {
    this.idCounter += 1;
    const newCategory = {
      id: this.idCounter,
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: Category['id'], data: UpdateCategoryDto): Category {
    const index = this.findIndex(id);
    const category = this.categories[index];
    const updatedCategory = {
      ...category,
      ...data,
    };
    this.categories[index] = updatedCategory;

    return this.categories[index];
  }

  delete(id: Category['id']) {
    const categoryIndex = this.findIndex(id);
    const deletedcategory = this.categories.splice(categoryIndex, 1)[0];
    return deletedcategory;
  }
}
