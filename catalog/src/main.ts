import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { KafkaModule } from './infrastructure/kafka/kafka.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(KafkaModule.config());
  app.useGlobalPipes(new ValidationPipe());

  const logger = new Logger('MainModule');

  const config = new DocumentBuilder()
    .setTitle('API Catalog')
    .setDescription(
      'This service provides operations to register Movies, TV Shows, Animes into the Cinema catalog.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservices();
  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Application listening on port ${port}.`);
}
bootstrap();
