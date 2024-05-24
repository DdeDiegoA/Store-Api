import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';
import { Category } from 'src/entities/category.entity';
import { CategoryService } from 'src/services/category.service';

//* A difrencia de app controller nuestro decorador contiene @controller('categories')

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}
  //esto implica que tenemos la raiz "categories" de manera implicita
  @Get()
  getCategories() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  getCategoriesById(@Param('id', ParseIntPipe) id: Category['id']) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: Category['id'],
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, data);
  }

  @Post()
  createCategory(@Body() data: CreateCategoryDto) {
    return this.categoryService.create(data);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: Category['id']) {
    return this.categoryService.delete(id);
  }

  //todo @Get(':id/products/:productId') //* => categories/:id/products/:productId
  // getCategory(@Param('id') id: string, @Param('productId') productId: string) {
  //   return `categorie id: ${id} Product id: ${productId}`;
  // }
}
