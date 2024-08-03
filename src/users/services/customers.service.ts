import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { CreateCustomerDto } from 'src/users/dtos/customers.dto';
import { Customer } from 'src/users/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepo.find();
  }

  findOne(id: Customer['id']): Promise<Customer> {
    const customer = this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`the customer with the id: #${id}`);
    }
    return customer;
  }

  create(data: CreateCustomerDto): Promise<Customer> {
    const newCustomer = this.customerRepo.create(data);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: Customer['id'], data: UpdateBrandDto): Promise<Customer> {
    const customer = await this.findOne(id);
    this.customerRepo.merge(customer, data);
    return this.customerRepo.save(customer);
  }

  delete(id: Customer['id']) {
    return this.customerRepo.delete(id);
  }
}
