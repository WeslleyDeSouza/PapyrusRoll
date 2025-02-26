import {
  Column,
  ColumnOptions,
  ColumnType,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PrimaryGeneratedColumnNumericOptions } from 'typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions';

export namespace DbPlatformSaveColumnType {
  //@ts-ignore
  export const isEnabled = !!(
    process.env.APP_ENV === 'test' ||
    process.env.DATABASE_TYPE === 'sqlite' ||
    process.env.DB_TYPE === 'sqlite' ||
    process.env.API_IS_TEST
  );
  export const fnTypeENUM: any = (config?: any) =>
    isEnabled ? { ...config, type: 'varchar' } : undefined;
}

const sqliteTypeMapping: { [key: string]: ColumnType } = {
  // Numeric types
  int: 'integer',
  integer: 'integer',
  tinyint: 'integer',
  smallint: 'integer',
  mediumint: 'integer',
  bigint: 'integer',
  float: 'real',
  double: 'real',
  decimal: 'numeric',
  numeric: 'numeric',

  // Boolean types
  bool: 'integer',
  boolean: 'integer',

  // Date/Time types
  date: 'text',
  datetime: 'text',
  timestamp: 'text',
  time: 'text',
  year: 'integer',

  // String types
  char: 'text',
  varchar: 'text',
  text: 'text',
  tinytext: 'text',
  mediumtext: 'text',
  longtext: 'text',

  // Binary types
  blob: 'blob',
  tinyblob: 'blob',
  mediumblob: 'blob',
  longblob: 'blob',
  binary: 'blob',
  varbinary: 'blob',

  // JSON
  json: 'text',
  jsonb: 'text',

  // Geometry types
  geometry: 'text',
  point: 'text',
  linestring: 'text',
  polygon: 'text',

  // Other types
  enum: 'text',
  uuid: 'text',
};

function resolveDbType(mySqlType: ColumnType): ColumnType {
  if (
    DbPlatformSaveColumnType.isEnabled &&
    <string>mySqlType in <any>sqliteTypeMapping
  )
    return sqliteTypeMapping[mySqlType.toString()];
  return mySqlType;
}

export function DbPlatformColumn(columnOptions?: ColumnOptions) {
  if (DbPlatformSaveColumnType.isEnabled && columnOptions?.type) {
    columnOptions.type = resolveDbType(columnOptions.type);

    if (['integer', 'text'].includes(<string>columnOptions.type)) {
      delete columnOptions.length;
      delete columnOptions.scale;
      delete columnOptions.precision;
    }

    if (columnOptions?.default && process.env['API_TEST_DISABLE_DEFAULT'])
      delete columnOptions.default;
  }

  if (DbPlatformSaveColumnType.isEnabled) {
    if (columnOptions?.default) {
      delete columnOptions.default;
      columnOptions.nullable = true;
    }
    if (columnOptions?.onUpdate) {
      delete columnOptions.onUpdate;
    }
  }

  //@ts-ignore
  return Column(columnOptions);
}
export function DbPlatformPrimaryGeneratedColumn(
  strategy: 'increment' | 'uuid',
  columnOptions?: ColumnOptions
) {
  if (columnOptions?.type) {
    columnOptions.type = resolveDbType(columnOptions.type);

    if (['integer', 'text'].includes(<string>columnOptions.type)) {
      delete columnOptions.length;
      delete columnOptions.scale;
      delete columnOptions.precision;
    }

    if (columnOptions.default && process.env['API_TEST_DISABLE_DEFAULT'])
      delete columnOptions.default;
  }

  return PrimaryGeneratedColumn(
    strategy as 'identity',
    columnOptions as PrimaryGeneratedColumnNumericOptions
  );
}
export const isDbPlatformEnabled = (): boolean =>
  !!DbPlatformSaveColumnType.isEnabled;
export const isDbPlatformIsMemory = (): boolean =>
  process.env[`DB_DATABASE`] == `:memory:`;
