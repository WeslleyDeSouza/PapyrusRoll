import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AuthLoginEntity } from './auth.entity.login';
import { Exclude, instanceToPlain } from 'class-transformer';
import { IAuthUser } from '../interface';
import { DbPlatformColumn } from '@wes/api-core';

@Entity('auth_user')
@Unique(['email'])
@Unique(['username'])
export class AuthUserEntity extends BaseEntity implements IAuthUser {
  @PrimaryGeneratedColumn('uuid')
  userId!: string;

  @DbPlatformColumn({ length: 70, nullable: false })
  email!: string;

  @DbPlatformColumn({ length: 70, nullable: true })
  username!: string;

  @DbPlatformColumn({ length: 50, type: 'varchar' })
  @Index()
  @Exclude()
  host!: string;

  @DbPlatformColumn({ length: 150, type: 'varchar' })
  @Exclude()
  password!: string;

  @DbPlatformColumn()
  @Exclude()
  salt!: string;

  @DbPlatformColumn({ type: 'smallint', precision: 5 })
  @Index()
  @Exclude()
  authCreatedAt!: number;

  @DbPlatformColumn({ type: 'date', nullable: true })
  @Exclude()
  deletedAt!: boolean;

  @OneToMany(() => AuthLoginEntity, (login) => login.user, { eager: false })
  @Exclude()
  logins!: AuthLoginEntity[];

  @DbPlatformColumn({ type: 'varchar', nullable: true })
  @Exclude()
  passwordResetLink!: string | null;

  // todo len
  @DbPlatformColumn({
    type: 'varchar',
    length: 250,
    nullable: true,
    default: null,
  })
  avatar!: string;

  @DbPlatformColumn({
    type: 'char',
    length: 2,
    nullable: true,
  })
  gender!: 'M' | 'W';

  @DbPlatformColumn({ type: 'varchar', length: 50, nullable: true })
  firstName!: string;

  @DbPlatformColumn({ type: 'varchar', length: 50, nullable: true })
  lastName!: string;

  @DbPlatformColumn({ type: 'varchar', length: 15, nullable: true })
  phone!: string;

  @DbPlatformColumn({ type: 'date', nullable: true })
  birthDay!: string;

  @DbPlatformColumn({
    type: 'char',
    length: 3,
    nullable: true,
  })
  preferredLanguage!: string;

  @CreateDateColumn()
  @Exclude()
  createdAt?: Date;

  get resetPasswordRequired(): boolean {
    return this.password == '*****' || this.passwordResetLink == '*****';
  }
  setResetPasswordRequired() {
    this.passwordResetLink = '*****';
  }

  @Exclude()
  _didEncrypt: boolean | undefined = undefined;

  @Exclude()
  _didSalt: boolean | undefined = undefined;

  @BeforeInsert()
  @BeforeUpdate()
  private async beforeInsert() {
    if (!this.authCreatedAt) this.setAuthCreatedAt();

    if (!this._didSalt) {
      return Promise.all([
        this.setSalt(await bcrypt.genSalt()).setPassword(
          await (this._didEncrypt
            ? this.password
            : bcrypt.hash(this.password || '****', this.salt))
        ),
      ]);
    }
    return;
  }

  public async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  public async validatePasswordOrResetCode(password: string): Promise<boolean> {
    return this.resetPasswordRequired || this.validatePassword(password);
  }

  public setAuthCreatedAt(year: number = new Date().getFullYear()): this {
    this.authCreatedAt = year;
    return this;
  }

  public setEmail(value: string): this {
    this.email = value;
    this.host = value.split('@')[1];
    return this;
  }

  public setUsername(value: string): this {
    this.username = value;
    return this;
  }

  public setSalt(value: string): this {
    this.salt = value;
    this._didSalt = true;
    return this;
  }

  public setPassword(value: string): this {
    this.password = value;
    return this;
  }

  public async setPasswordAndEncrypt(
    value: string,
    salt?: string
  ): Promise<this> {
    if (salt) {
      this._didSalt = true;
      this.salt = salt;
    }

    this.password = await bcrypt.hash(value || '****', this.salt);

    this._didEncrypt = true;

    return this;
  }

  public initialise(data: Partial<AuthUserEntity>, secure = false): this {
    if (!secure) {
      delete data.password;
      Object.assign(this, data);
    }
    return this;
  }

  public toJSON() {
    return instanceToPlain(this);
  }
}
