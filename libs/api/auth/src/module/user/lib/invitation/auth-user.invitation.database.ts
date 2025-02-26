import { ConnectionOptions } from 'typeorm';
import { AuthLoginEntity } from '../../entities/auth.entity.login';
import { AuthUserInvitedEntity } from './auth.entity.user.invited';
import { AuthUserEntity } from '../../entities/auth.entity.user';
import * as path from 'path';

const DBAuthInvitedOptions = <ConnectionOptions>{
  type: process.env['DB_TYPE'],
  host: process.env['DB_HOST'],
  port: +(process.env['DB_PORT'] || 0),
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  synchronize: true,
  logging: false,
  migrationsRun: true,
  logger: 'file',
  cli: {
    migrationsDir: path.resolve('./migrations'),
  },
  entities: [
      AuthUserEntity,
      AuthLoginEntity,
      AuthUserInvitedEntity
  ]
};

export default DBAuthInvitedOptions;
