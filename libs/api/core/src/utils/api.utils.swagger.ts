import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export namespace API_SWAGGER_UTILS {
  const getEnumKeys = (enumObj: object) =>
    Object.values(enumObj).filter((value) => typeof value === 'string');

  export const swaggerBuilder = (
    app: INestApplication,
    appName?: string,
    cb?: any
  ) => {
    const config = new DocumentBuilder()
      .setTitle('API')
      .setVersion('1.0.0')
      .addBearerAuth({
        description: `Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      })
      .build();

    const document = SwaggerModule.createDocument(app, config);

    if (cb) {
      cb({ document, getEnumKeys });
    }

    SwaggerModule.setup('/docs', app, document, {
      swaggerOptions: {
        docExpansion: 'none',
        persistAuthorization: true,
      },
    });

    try {
      if (appName) {
        fs.writeFileSync(
          './config/swagger/' + appName + '-spec.json',
          JSON.stringify(document).replace(/Controller/g, '')
        );

        require('child_process').exec('npm run ng-swagger');
      }
    } catch (e) {
      console.warn('WriteFileSync Error on config/swagger');
      console.error(e);
    }
  };
}
