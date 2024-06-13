import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ProductsModule } from 'src/products/products.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ProductsModule, HttpModule],
  controllers: [CustomersController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
