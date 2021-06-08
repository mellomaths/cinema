import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class NotificationPreferencesDto {
  @IsBoolean()
  @ApiProperty()
  email: boolean;

  @IsBoolean()
  @ApiProperty()
  pushNotifications: boolean;
}

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone: string;

  @IsNumber()
  @ApiProperty()
  age: number;

  @IsObject()
  @ApiProperty()
  profile: NotificationPreferencesDto;
}

export class CustomerCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsObject()
  @ApiProperty()
  profile: ProfileDto;
}
