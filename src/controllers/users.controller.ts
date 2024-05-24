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
import { UpdateBrandDto } from 'src/dtos/brands.dto';
import { CreateUserDto } from 'src/dtos/users.dto';
import { User } from 'src/entities/users.entity';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
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
