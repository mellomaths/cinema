import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export enum MediaType {
  MOVIE,
  ANIME,
  TV_SHOW,
}

export enum CategoryType {
  ACTION,
  FAMILY,
  CLASSIC,
  COMEDY,
  DOCUMENTARY,
  DRAMA,
  FAITH,
  FANTASY,
  HOLLYWOOD,
  HORROR,
  INDEPENDENT,
  LGBTQ,
  MUSICAL,
  POLICE,
  ROMANCE,
  SCIFI,
  SPORT,
  STAND_UP,
  THRILLER,
}

export class MediaCreateDTO {
  @IsNotEmpty()
  @IsEnum(MediaType)
  @IsString()
  @ApiProperty({ enum: MediaType })
  type: string;

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
  @IsEnum(CategoryType, { each: true })
  @IsArray()
  @ApiProperty({ enum: CategoryType, isArray: true })
  category: string[];

  @IsInt()
  @ApiProperty()
  year: number;

  @IsNumber()
  @ApiProperty()
  rating: number;
}

export class MediaMetricsDTO {
  @IsNumber()
  @ApiProperty()
  ordersCount: number;
}

export class MediaDTO extends MediaCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;

  @IsObject()
  @ApiProperty()
  metrics: MediaMetricsDTO;
}
