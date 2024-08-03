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
import { ApiTags } from '@nestjs/swagger';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/category.dto';
import { CategoryService } from 'src/products/services/category.service';

//* A difrencia de app controller nuestro decorador contiene @controller('categories')
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}
  //esto implica que tenemos la raiz "categories" de manera implicita
  @Get()
  getCategories() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  getCategoriesById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, data);
  }

  @Post()
  createCategory(@Body() data: CreateCategoryDto) {
    return this.categoryService.create(data);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }

  //todo @Get(':id/products/:productId') //* => categories/:id/products/:productId
  // getCategory(@Param('id') id: string, @Param('productId') productId: string) {
  //   return `categorie id: ${id} Product id: ${productId}`;
  // }
}
