import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDto,
  UpdateProdcutDto,
} from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: Product['id']): Promise<Product> {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) throw new NotFoundException(`Product with the id #${id}`);

    return product;
  }

  create(payload: CreateProductDto): Promise<Product> {
    // const newProduct = new Product();
    // newProduct.image = payload.image;
    // newProduct.name = payload.name;
    // newProduct.description = payload.description;
    // newProduct.price = payload.price;
    // newProduct.stock = payload.stock;
    const newProduct = this.productRepo.create(payload);

    return this.productRepo.save(newProduct);
  }

  async update(id: Product['id'], data: UpdateProdcutDto): Promise<Product> {
    const product = await this.findOne(id);
    this.productRepo.merge(product, data);
    return this.productRepo.save(product);
  }

  delete(id: Product['id']) {
    return this.productRepo.delete(id);
  }
}
