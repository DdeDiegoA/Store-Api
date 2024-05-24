import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brands.dto';
import { Brand } from 'src/entities/brand.entitity';

@Injectable()
export class BrandsService {
  private idBrand = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Apple',
      niche: 'Tech',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: Brand['id']): Brand {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`the brand with the id ${id} doesnt exist`);
    }
    return brand;
  }

  private findIndex(id: Brand['id']): number {
    const index = this.brands.findIndex((brand) => brand.id === id);
    if (index === -1) {
      throw new NotFoundException(`the brand with the id ${id} doesnt exist`);
    }
    return index;
  }

  create(data: CreateBrandDto): Brand {
    this.idBrand += 1;
    const newBrand: Brand = {
      id: this.idBrand,
      ...data,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: Brand['id'], data: UpdateBrandDto): Brand {
    const brandIndex = this.findIndex(id);
    const brand = this.brands[brandIndex];
    const updatedBrand = {
      ...brand,
      ...data,
    };
    this.brands[brandIndex] = updatedBrand;
    return updatedBrand;
  }

  delete(id: Brand['id']) {
    const brandIndex = this.findIndex(id);
    const deletedBrand = this.brands.splice(brandIndex, 1)[0];
    return deletedBrand;
  }
}
