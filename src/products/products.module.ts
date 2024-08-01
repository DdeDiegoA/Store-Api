import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoryService } from './services/category.service';
import { Category } from './entities/category.entity';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { Brand } from './entities/brand.entitity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoryService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
