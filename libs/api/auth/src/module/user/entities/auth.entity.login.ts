import {
  BaseEntity,
  BeforeInsert,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { AuthUserEntity } from './auth.entity.user';
import { Exclude } from 'class-transformer';
import {
  DbPlatformColumn,
  DbPlatformPrimaryGeneratedColumn,
  DbPlatformSaveColumnType,
} from '@wes/api-core';

@Entity('auth_login')
@Unique(['uuId', 'user', 'type'])
@Index(['authCreatedAt'])
export class AuthLoginEntity extends BaseEntity {
  @DbPlatformPrimaryGeneratedColumn('uuid')
  id!: string;

  @DbPlatformColumn({ type: 'varchar', length: 55, nullable: false })
  uuId!: string;

  @DbPlatformColumn({ type: 'smallint', precision: 5 })
  authCreatedAt!: number;

  @ManyToOne(() => AuthUserEntity, (user) => user.logins, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user!: AuthUserEntity;

  @DbPlatformColumn({ type: 'varchar', length: 50, nullable: true })
  userAgent!: string;

  @DbPlatformColumn({ type: 'uuid', nullable: true })
  tenantId!: string;

  @DbPlatformColumn(
    DbPlatformSaveColumnType.fnTypeENUM({ default: null, nullable: true }) || {
      type: 'enum',
      nullable: true,
      default: null,
      enum: ['accessToken', 'refreshToken', '', 'intern' /*Remove intern*/],
    }
  )
  type!: 'accessToken' | 'refreshToken';

  @DbPlatformColumn({
    type: 'varchar',
    nullable: true,
    length: 200,
    default: null,
  })
  @Exclude()
  value?: string | undefined | null;

  @DbPlatformColumn({
    type: 'timestamp',
    precision: 1,
    default: () => 'CURRENT_TIMESTAMP(1)',
    onUpdate: 'CURRENT_TIMESTAMP(1)',
  })
  updatedAt!: Date;

  @DbPlatformColumn({
    type: 'timestamp',
    nullable: true,
  })
  expiresAt!: Date;

  @BeforeInsert()
  beforeInsert(): void {
    if (typeof this.expiresAt === 'number')
      this.expiresAt = new Date(this.expiresAt);
  }
}
