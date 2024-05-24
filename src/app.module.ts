import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { CategoryService } from './services/category.service';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';

@Module({
  imports: [],
  controllers: [ProductsController, CategoriesController, BrandsController, UsersController, CustomersController],
  providers: [ProductsService, CategoryService, BrandsService, UsersService, CustomersService],
})
export class AppModule {}
