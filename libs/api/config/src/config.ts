import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { VersioningType, VersioningOptions } from '@nestjs/common';

export namespace API_CONFIG_MS_CONNECTION {
  const defaultUrl =
    process.env['API_MS_URL_RMQ'] || 'amqp://host.docker.internal:5672';

  export const NOTIFY = <MicroserviceOptions>{
    transport: Transport.RMQ,
    options: {
      urls: [defaultUrl],
      queue: 'queue_notify',
      queueOptions: {
        durable: true,
      },
    },
  };
}

export namespace API_CONFIG_ENDPOINT_VERSIONING {
  export const defaultHttpVersion = <VersioningOptions>{
    type: VersioningType.HEADER,
    header: 'X-API-Version',
    defaultVersion: '1',
  };
}
