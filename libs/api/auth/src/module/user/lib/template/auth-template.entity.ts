import {
  DbPlatformColumn,
  DbPlatformPrimaryGeneratedColumn,
} from '@wes/api-core';

import { BaseEntity, Entity, Index, Unique } from 'typeorm';

@Entity('auth_template')
@Index(['companyId'])
@Unique(['companyId', 'name'])
export class AuthTemplateEntity extends BaseEntity {
  @DbPlatformPrimaryGeneratedColumn('uuid')
  id!: string;

  @DbPlatformColumn({ type: 'uuid', nullable: true })
  tenantId!: number;

  @DbPlatformColumn({
    type: 'char',
    length: 3,
    nullable: false,
    default: 'DE',
  })
  lang!: string;

  @DbPlatformColumn({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  name!: string;

  @DbPlatformColumn({
    type: 'varchar',
    length: 90,
    nullable: true,
  })
  title!: string;

  @DbPlatformColumn({ type: 'text', nullable: true })
  template!: string;

  @DbPlatformColumn({ type: 'text', nullable: true })
  settings!: string;

  public initialise(params: Partial<AuthTemplateEntity>) {
    if (params) Object.assign(this, params);
    return this;
  }
}
