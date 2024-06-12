import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProdcutDto,
} from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'product1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 2,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: Product['id']) {
    const product = this.products.find((product) => product.id === id);

    if (!product) throw new NotFoundException(`Product with the id #${id}`);

    return product;
  }

  private findIndex(id: Product['id']) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Product with the id #${id}`);
    return index;
  }

  create(payload: CreateProductDto): Product {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: Product['id'], data: UpdateProdcutDto): Product {
    const productIndex = this.findIndex(id);
    const product = this.products[productIndex];

    const updatedProduct: Product = {
      ...product,
      ...data,
    };

    this.products[productIndex] = updatedProduct;

    return updatedProduct;
  }

  delete(id: Product['id']) {
    const productIndex = this.findIndex(id);
    const deletedProduct = this.products.splice(productIndex, 1)[0];
    return deletedProduct;
  }
}
