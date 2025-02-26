import { Module } from '@nestjs/common';
import { AuthUserController } from './controller';
import { AuthUserModule } from './auth-user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthUserController],
  imports: [AuthUserModule],
  exports: [AuthUserModule],
})
export class AuthUserWithRoutingModule {
  static dbSettings = AuthUserModule.dbSettings;
}
