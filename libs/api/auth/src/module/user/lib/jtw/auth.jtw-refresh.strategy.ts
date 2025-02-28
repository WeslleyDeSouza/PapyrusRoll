import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class AuthJtwRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor() {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: <string>(
        (process.env['APP_' + process.env['APP_NAME'] + '_SECRET'] ||
          process.env['APP_SECRET'])
      ),
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req
      .get('Authorization')
      ?.replace('Bearer', '')
      ?.trim();

    return { ...payload, refreshToken };
  }
}
