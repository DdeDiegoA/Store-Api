import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProductsModule, UsersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
