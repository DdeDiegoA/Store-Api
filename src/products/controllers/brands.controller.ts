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
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { BrandsService } from 'src/products/services/brands.service';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  getBrands() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  getBrandById(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findOne(id);
  }

  @Post()
  createBrand(@Body() data: CreateBrandDto) {
    return this.brandsService.create(data);
  }

  @Put(':id')
  updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, data);
  }

  @Delete(':id')
  deleteBrand(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.delete(id);
  }
}
