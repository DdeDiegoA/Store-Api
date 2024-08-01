import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/users.entity';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';
import { HttpModule } from '@nestjs/axios';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [
    ProductsModule,
    HttpModule,
    TypeOrmModule.forFeature([User, Customer]),
  ],
  controllers: [CustomersController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
