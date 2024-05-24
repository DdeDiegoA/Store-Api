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
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brands.dto';
import { Brand } from 'src/entities/brand.entitity';
import { BrandsService } from 'src/services/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  getBrands() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  getBrandById(@Param('id', ParseIntPipe) id: Brand['id']) {
    return this.brandsService.findOne(id);
  }

  @Post()
  createBrand(@Body() data: CreateBrandDto) {
    return this.brandsService.create(data);
  }

  @Put(':id')
  updateBrand(
    @Param('id', ParseIntPipe) id: Brand['id'],
    @Body() data: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, data);
  }

  @Delete(':id')
  deleteBrand(@Param('id', ParseIntPipe) id: Brand['id']) {
    return this.brandsService.delete(id);
  }
}
