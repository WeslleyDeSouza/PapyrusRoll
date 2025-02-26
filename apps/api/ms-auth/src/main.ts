import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { API_SWAGGER_UTILS } from '@wes/api-core';
import { API_CONFIG_ENDPOINT_VERSIONING } from '@wes/api-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = process.env.PORT || 3000;

  app.enableVersioning(API_CONFIG_ENDPOINT_VERSIONING.defaultHttpVersion);
  app.setGlobalPrefix(globalPrefix);

  // Documentation
  API_SWAGGER_UTILS.swaggerBuilder(app, 'auth');

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
