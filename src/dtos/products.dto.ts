import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsPositive()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  image: string;
}

export class UpdateProdcutDto extends PartialType(CreateProductDto) {}
