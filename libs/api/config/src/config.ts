import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { VersioningType, VersioningOptions } from '@nestjs/common';
import 'dotenv/config';

export namespace API_CONFIG {
  export function envInit() {}
}

export namespace API_CONFIG_MS_CONNECTION {
  const defaultUrl =
    process.env['API_MS_URL_RMQ'] || 'amqp://host.docker.internal:5672';

  export namespace NOTIFY {
    export const connectionName = 'apiNotify';
    export const transport = <MicroserviceOptions>{
      name: connectionName,
      transport: Transport.RMQ,
      options: {
        urls: [defaultUrl],
        queue: 'queue_notify',
        queueOptions: {
          durable: true,
        },
      },
    };
    export const endpointDefinition = {
      healthCheck: 'healthcheck',
      configVerify: 'config-verify',
      messageSend: 'message-send',
      logsGet: 'logs',
    };
    export namespace DTO {
      export class NotifySendDTO {}
      export class NotifyConfigVerifyDTO {}
    }
  }
}

export namespace API_CONFIG_ENDPOINT_VERSIONING {
  export const defaultHttpVersion = <VersioningOptions>{
    type: VersioningType.HEADER,
    header: 'X-API-Version',
    defaultVersion: '1',
  };
}
