import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
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
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone()
  @ApiProperty()
  phone: string;

  @IsNumber()
  @ApiProperty()
  age: number;

  @IsObject()
  @ApiProperty()
  notificationPreferences: NotificationPreferencesDto;
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
