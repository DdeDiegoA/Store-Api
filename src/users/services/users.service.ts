import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/users.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @Inject('DATA') private tasks: any[],
    @Inject('PG') private clientPg: Client,
    private configService: ConfigService,
  ) {}

  private idUser = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'Diego',
      email: 'Diego@Correo.com',
      phone: 3131313,
      country: 'Colombia',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    console.log(apiKey);
    console.log(this.tasks);
    return this.users;
  }

  findOne(id: User['id']) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`the user with the id ${id} doesnt exist`);
    }
    return user;
  }

  private findIndex(id: User['id']): number {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`the user with the id ${id} doesnt exist`);
    }
    return index;
  }

  create(data: CreateUserDto): User {
    this.idUser += 1;
    const newUser: User = {
      id: this.idUser,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: User['id'], data: UpdateUserDto) {
    const userIndex = this.findIndex(id);
    const user = this.users[userIndex];
    const updatedUser: User = {
      ...user,
      ...data,
    };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  delete(id: User['id']) {
    const userIndex = this.findIndex(id);
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }

  async getOrdersByUser(id: User['id']): Promise<Order> {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  async getTasks(): Promise<any> {
    try {
      const res = await this.clientPg.query('SELECT * FROM tasks');
      return res.rows;
    } catch (error) {
      throw new Error(error);
    }
  }
}
