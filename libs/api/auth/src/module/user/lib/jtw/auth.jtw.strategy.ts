import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { IAuthJtwPayload } from './auth.jtw.interface';

@Injectable()
export class AuthJtwStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private jwtService: JwtService) {
    super({
      secretOrKey: <string>(
        (process.env['APP_' + process.env['APP_NAME'] + '_SECRET'] ||
          process.env['APP_SECRET'])
      ),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(payload: IAuthJtwPayload) {
    return payload;
  }
}
