import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserEntity } from '../entities/auth.entity.user';

export const GetUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): AuthUserEntity => {
  const { user } = ctx.switchToHttp().getRequest();
  return user;
});

export const GetSession = createParamDecorator((_data: unknown, ctx: ExecutionContext): AuthUserEntity => {
  const req = ctx.switchToHttp().getRequest();
  return req.user?.session || req.session;
});

export const GetUserId = createParamDecorator((_data: unknown, ctx: ExecutionContext): AuthUserEntity => {
  const req = ctx.switchToHttp().getRequest();
  return req.user?.userId || req?.userId;
});

