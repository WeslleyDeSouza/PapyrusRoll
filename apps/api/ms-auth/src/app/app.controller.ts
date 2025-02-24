import { Controller, Get, Inject, Injectable } from '@nestjs/common';
import { AppService } from './app.service';
import { API_CONFIG_MS_CONNECTION } from '@wes/api-config';
import { ClientProxy } from '@nestjs/microservices';

import NOTIFY = API_CONFIG_MS_CONNECTION.NOTIFY;

@Controller()
export class AppController {
  constructor(
    @Inject(NOTIFY.connectionName) private client: ClientProxy,
    private readonly appService: AppService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
