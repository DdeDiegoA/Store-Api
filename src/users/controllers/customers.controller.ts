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
import { CustomersService } from '../services/customers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getCustomer() {
    return this.customersService.findAll();
  }

  @Get(':id')
  getCustomerByIDd(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  createCustomer(@Body() data: CreateCustomerDto) {
    return this.customersService.create(data);
  }

  @Put(':id')
  updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, data);
  }

  @Delete(':id')
  deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.delete(id);
  }
}
