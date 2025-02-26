import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthJtwStrategy } from './lib/jtw';

import DBAuthOptions from './db/auth.database';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthLoginEntity, AuthUserEntity } from './entities';
import { AuthJtwRefreshTokenStrategy } from './lib/jtw/auth.jtw-refresh.strategy';
import { AuthService } from './auth-user.service';
import { AuthUserService } from './service';
import { AuthUserLoginService } from './service/auth-login.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AuthUserEntity, AuthLoginEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      global: true,
      secret: process.env['APP_SECRET'],
      signOptions: {
        expiresIn: process.env['APP_SECRET_EXPIRES'] || 0,
      },
    }),
  ],
  providers: [
    AuthService,
    AuthUserService,
    AuthUserLoginService,
    AuthJtwStrategy,
    AuthJtwRefreshTokenStrategy,
  ],
  exports: [AuthService, AuthJtwRefreshTokenStrategy],
})
export class AuthUserModule {
  static dbSettings = DBAuthOptions;
}

@Global()
@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env['APP_SECRET'],
      // signOptions: {
      //   expiresIn: process.env['APP_SECRET_EXPIRES'] || 0,
      // },
    }),
  ],
  providers: [AuthJtwStrategy, AuthJtwRefreshTokenStrategy],
  exports: [AuthJtwStrategy, AuthJtwRefreshTokenStrategy, JwtModule],
})
export class AuthJWTModule {}
