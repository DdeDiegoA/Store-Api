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
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customers.dto';
import { Customer } from 'src/users/entities/customer.entity';
import { CustomersService } from '../services/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getCustomer() {
    return this.customersService.findAll();
  }

  @Get(':id')
  getCustomerByIDd(@Param('id', ParseIntPipe) id: Customer['id']) {
    return this.customersService.findOne(id);
  }

  @Post()
  createCustomer(@Body() data: CreateCustomerDto) {
    return this.customersService.create(data);
  }

  @Put(':id')
  updateCustomer(
    @Param('id', ParseIntPipe) id: Customer['id'],
    @Body() data: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, data);
  }

  @Delete(':id')
  deleteCustomer(@Param('id', ParseIntPipe) id: Customer['id']) {
    return this.customersService.delete(id);
  }
}
