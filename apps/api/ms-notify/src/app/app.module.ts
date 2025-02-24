import { Module } from '@nestjs/common';
import { ApiNotifyMessagePatternController as AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
