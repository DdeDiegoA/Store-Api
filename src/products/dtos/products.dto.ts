import { ApiProperty, PartialType } from '@nestjs/swagger';
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
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsPositive()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  stock: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  image: string;
}

export class UpdateProdcutDto extends PartialType(CreateProductDto) {}
