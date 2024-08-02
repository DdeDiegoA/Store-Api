import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import {
//   CreateProductDto,
//   UpdateProdcutDto,
// } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  // private counterId = 1;
  // private products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'product1',
  //     description: 'bla bla',
  //     price: 122,
  //     image: '',
  //     stock: 2,
  //   },
  // ];

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: Product['id']) {
    const product = this.productRepo.findOneBy({ id });

    if (!product) throw new NotFoundException(`Product with the id #${id}`);

    return product;
  }

  // private findIndex(id: Product['id']) {
  //   const index = this.products.findIndex((item) => item.id === id);
  //   if (index === -1) throw new NotFoundException(`Product with the id #${id}`);
  //   return index;
  // }

  // create(payload: CreateProductDto): Product {
  //   this.counterId += 1;
  //   const newProduct = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // update(id: Product['id'], data: UpdateProdcutDto): Product {
  //   const productIndex = this.findIndex(id);
  //   const product = this.products[productIndex];

  //   const updatedProduct: Product = {
  //     ...product,
  //     ...data,
  //   };

  //   this.products[productIndex] = updatedProduct;

  //   return updatedProduct;
  // }

  // delete(id: Product['id']) {
  //   const productIndex = this.findIndex(id);
  //   const deletedProduct = this.products.splice(productIndex, 1)[0];
  //   return deletedProduct;
  // }
}
