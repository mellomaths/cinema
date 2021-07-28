import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MediaCreateDTO, MediaDTO } from './dto/media.dto';
import { MediasService } from './medias.service';

@Controller('medias')
export class MediasController {
  private readonly logger = new Logger('MediasController');

  public constructor(private readonly mediasService: MediasService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new media of any type in the Cinema.' })
  @ApiBody({ type: MediaCreateDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Media successfully created.',
    type: MediaDTO,
  })
  async createNewMedia(
    @Body() mediaCreateDTO: MediaCreateDTO,
    @Headers('request-id') requestId: string,
  ) {
    this.logger.log('Received payload: ' + JSON.stringify(mediaCreateDTO));
    this.logger.log(`Request ID: ${requestId}.`);
    await this.mediasService.registerNewMedia(mediaCreateDTO, requestId);
    return { ok: true };
  }

  @Get(':id')
  @ApiOperation({ summary: "Get media information by it's id." })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Media found.',
    type: MediaDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Media not found.',
  })
  async getMediaById(
    @Param('id') id: string,
    @Headers('request-id') requestId: string,
  ) {
    this.logger.log(`Received request to find Media by id=${id}.`);
    this.logger.log(`Request ID: ${requestId}.`);
    return this.mediasService.findMediaById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all medias registered.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of medias retrieved.',
    type: MediaDTO,
    isArray: true,
  })
  async getMedias(@Headers('request-id') requestId: string) {
    this.logger.log(`Received request to find all medias registered.`);
    this.logger.log(`Request ID: ${requestId}.`);
    return this.mediasService.findMedias();
  }
}
