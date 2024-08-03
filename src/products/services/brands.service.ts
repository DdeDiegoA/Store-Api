import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { Brand } from 'src/products/entities/brand.entitity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: Brand['id']): Promise<Brand> {
    const brand = await this.brandRepo.findOneBy({ id });
    if (!brand) {
      throw new NotFoundException(`the brand with the id ${id} doesnt exist`);
    }
    return brand;
  }

  create(data: CreateBrandDto): Promise<Brand> {
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id: Brand['id'], data: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findOne(id);
    this.brandRepo.merge(brand, data);
    return this.brandRepo.save(brand);
  }

  delete(id: Brand['id']) {
    return this.brandRepo.delete(id);
  }
}
