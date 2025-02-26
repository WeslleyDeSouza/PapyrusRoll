import { ConnectionOptions } from 'typeorm';

import * as path from 'path';
import { AuthTemplateEntity } from './auth-template.entity';

const DBAuthTemplateOptions = <ConnectionOptions>{
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
  entities: [AuthTemplateEntity],
};

export default DBAuthTemplateOptions;
