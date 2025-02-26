import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, instanceToPlain } from 'class-transformer';
import { DbAuthAwareColumn, SaveColumnType } from '../../../../common';

@Entity('auth_user_invited')
@Unique(['email', 'businessUuId'])
export class AuthUserInvitedEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  invitationId: string;

  @DbAuthAwareColumn({ type: 'varchar', unique: false, length: 70 })
  email: string;

  @DbAuthAwareColumn({ type: 'uuid', nullable: false })
  businessUuId: string;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DbAuthAwareColumn({ type: SaveColumnType.typeChar, unique: false, length: 1, default: null })
  state: string;

  @DbAuthAwareColumn(SaveColumnType.fnTypeENUM({default:'U'}) || { type: 'enum', enum: ['U', 'C'], default: 'U' })
  direction: 'U' | 'C'; // user , company

  public toJSON() {
    return instanceToPlain(this);
  }
}
