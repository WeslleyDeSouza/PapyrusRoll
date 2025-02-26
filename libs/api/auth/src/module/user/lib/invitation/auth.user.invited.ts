import { Repository } from 'typeorm';
import { AuthUserInvitedEntity } from './auth.entity.user.invited';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// TODO Refactore
// create enum for direction
// rename functions

@Injectable()
export class AuthUserInvited {
  constructor(
    @InjectRepository(AuthUserInvitedEntity)
    public repo: Repository<AuthUserInvitedEntity>
  ) {}

  getInvitationsCreatedByCompany(businessUuId: string) {
    return this.repo.find({
      where: {
        businessUuId: businessUuId,
        direction: 'C',
      },
    });
  }
  getInvitationRequestFromCompany(businessUuId: string) {
    return this.repo.find({
      where: {
        businessUuId: businessUuId,
        direction: 'U',
      },
    });
  }

  getInvitationsFromUser(email: string) {
    return this.repo.find({
      where: {
        email: email,
      },
    });
  }

  async deleteCompanyInvitationFromUser(email: string, businessUuId: string, all = false): Promise<any> {
    if (all) {
      this.repo.delete({
        email: email || '-1',
        businessUuId: businessUuId || '-1',
        direction: 'U',
      });
    }
    return this.repo.delete({
      email: email || '-1',
      businessUuId: businessUuId || '-1',
      direction: 'C',
    });
  }
  async deleteInvitation(invitationId: string, email: string): Promise<any> {
    return this.repo.delete({
      email: email || '-1',
      invitationId: invitationId || '-1',
    });
  }

  async getInvitationData(invitationId: string) {
    return await this.repo.findOne({
      where: {
        invitationId: invitationId,
      },
    });
  }

  async verifyInvitationByEmailAndId(email: string, invitationId: string, params = {}) {
    return await this.repo.findOne({
      where: {
        ...params,
        email: email,
        invitationId: invitationId,
      },
    });
  }

  async verifyInvitationOrCreate(email: string, businessUuId: string, direction: 'C' | 'U'): Promise<boolean | string> {
    const user = await this.repo.findOne({
      where: {
        email: email,
        businessUuId: businessUuId,
      },
    });

    if (!user) {
      const newUser = this.repo.create();
      newUser.businessUuId = businessUuId;
      newUser.email = email;
      newUser.direction = direction;
      await newUser.save({ transaction: false });
      return newUser.invitationId;
    }

    // verify timestap
    if (+new Date() - +new Date(<any>user.updatedAt) > 300000) {
      user.updatedAt = new Date();
      if (direction == 'C') user.direction = direction;
      user.save({ transaction: false });
      return user.invitationId;
    }

    return user.invitationId;
  }

  async acceptInvitation(invitationId, email, direction) {
    const inv = await this.repo.findOne({
      where: {
        invitationId: invitationId,
        email: email,
        direction: direction,
      },
    });

    if (inv) {
      inv.state = '1';
      await inv.save();
      return inv;
    }

    return null;
  }
}
