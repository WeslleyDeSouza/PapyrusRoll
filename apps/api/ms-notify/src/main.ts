import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions } from '@nestjs/microservices';

import { API_SWAGGER_UTILS } from '@wes/api-core';
import {
  API_CONFIG_ENDPOINT_VERSIONING,
  API_CONFIG_MS_CONNECTION,
} from '@wes/api-config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/notify';
  const port = 3003;

  app.enableVersioning(API_CONFIG_ENDPOINT_VERSIONING.defaultHttpVersion);
  app.setGlobalPrefix(globalPrefix);

  // Documentation
  API_SWAGGER_UTILS.swaggerBuilder(app, 'ms-notify');

  // MS
  app.connectMicroservice<MicroserviceOptions>(
    API_CONFIG_MS_CONNECTION.NOTIFY.transport
  );

  await app.listen(process.env.PORT ?? port);
  await app.startAllMicroservices();

  // Log
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(`🚀 Swagger is running on: http://localhost:${port}/docs`);
}

bootstrap();
