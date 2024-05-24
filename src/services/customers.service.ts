import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBrandDto } from 'src/dtos/brands.dto';
import { CreateCustomerDto } from 'src/dtos/customers.dto';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomersService {
  private idCustomer = 1;
  customers: Customer[] = [
    {
      id: 1,
      name: 'Ramon',
      gender: 'Masculino',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: Customer['id']): Customer {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new NotFoundException(`the customer with the id: #${id}`);
    }
    return customer;
  }

  private findIndex(id: Customer['id']): number {
    const index = this.customers.findIndex((customer) => customer.id === id);
    if (index === -1) {
      throw new NotFoundException(`the customer with the id: #${id}`);
    }
    return index;
  }

  create(data: CreateCustomerDto): Customer {
    this.idCustomer += 1;
    const newCustomer: Customer = {
      id: this.idCustomer,
      ...data,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: Customer['id'], data: UpdateBrandDto): Customer {
    const customerIndex = this.findIndex(id);
    const customer = this.customers[customerIndex];
    const updatedCustomer = {
      ...customer,
      ...data,
    };
    this.customers[customerIndex] = updatedCustomer;
    return this.customers[customerIndex];
  }

  delete(id: Customer['id']) {
    const customerIndex = this.findIndex(id);
    const deletedcustomer = this.customers.splice(customerIndex, 1)[0];
    return deletedcustomer;
  }
}
