import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateProductDto,
  UpdateProdcutDto,
} from 'src/products/dtos/products.dto';
import { ProductsService } from 'src/products/services/products.service';

//* A difrencia de app controller nuestro decorador contiene @controller('products')
@ApiTags('products')
@Controller('products')
export class ProductsController {
  //* esto implica que tenemos la raiz "products" de manera implicita

  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  @HttpCode(HttpStatus.ACCEPTED)
  getProducts() {
    // @Query('brand') brand: string, // @Query('offset') offset: number = 0, // @Query('limit') limit: number = 100,
    // return {
    //   message: `products con limit:${limit} y offset:${offset} y la brand: ${brand}`,
    // };
    return this.productsService.findAll();
  }

  @Get('/filter')
  productFilter() {
    return { message: `product filter` };
  }

  //* esta ruta seria => "products/:productId"

  @Get(':productId')
  @ApiOperation({
    summary: 'get a product by ID',
    description: 'you would send a Id in the url, then returns the product',
  })
  getProductById(@Param('productId', ParseIntPipe) productId: number) {
    // return `product id: ${productId}`;
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'producto creado',
    //   payload,
    // };
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProdcutDto,
  ) {
    // return {
    //   id,
    //   payload,
    // };
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    // return {
    //   message: `the element with the id:${id} was deleted`,
    // };
    return this.productsService.delete(id);
  }
}
