import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class FilmCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  plot: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  language: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  category: string;

  @IsInt()
  @ApiProperty()
  year: number;

  @IsDecimal()
  @ApiProperty()
  rating: number;
}
