import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MovieCreateDTO {
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

  @IsNumber()
  @ApiProperty()
  rating: number;
}

export class MovieDTO extends MovieCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;
}
