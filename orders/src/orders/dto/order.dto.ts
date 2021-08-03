import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductDto } from './product.dto';

export class OrderCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  customerId: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @ApiProperty({ isArray: true })
  products: ProductDto[];
}

export class OrderDto extends OrderCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
