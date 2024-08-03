import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the name of the user' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  phone: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  country: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
