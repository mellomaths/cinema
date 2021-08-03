import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNumber({ allowNaN: false })
  @Min(1)
  @ApiProperty({ default: 1 })
  amount: number;
}
