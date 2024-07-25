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
import { UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { CreateUserDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: User['id']) {
    return this.usersService.getOrdersByUser(id);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: User['id']) {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: User['id'],
    @Body() data: UpdateBrandDto,
  ) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: User['id']) {
    return this.usersService.delete(id);
  }
}
