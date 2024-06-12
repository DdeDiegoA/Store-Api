import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { CategoryService } from './services/category.service';
import { BrandsService } from './services/brands.service';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoryService, BrandsService],
})
export class ProductsModule {}
