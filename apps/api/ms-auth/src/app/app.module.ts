import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProviderOptions, ClientsModule } from '@nestjs/microservices';
import { API_CONFIG_MS_CONNECTION } from '@wes/api-config';
import { AuthUserWithRoutingModule } from '@wes/api-auth';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ClientsModule.register([
      API_CONFIG_MS_CONNECTION.NOTIFY.transport as ClientProviderOptions,
    ]),
    TypeOrmModule.forRoot(),
    AuthUserWithRoutingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
