import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthLoginEntity, AuthUserEntity } from '../entities';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AuthUserLoginService {
  constructor(
    @InjectRepository(AuthLoginEntity)
    private loginRepo: Repository<AuthLoginEntity>
  ) {}

  async create(
    createUserDto: Partial<AuthLoginEntity>
  ): Promise<AuthLoginEntity> {
    const createdUser = this.loginRepo.create(createUserDto);
    return createdUser.save();
  }

  async findById(id: string): Promise<AuthLoginEntity | null> {
    return this.loginRepo.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateUserDto: Partial<AuthLoginEntity>
  ): Promise<UpdateResult> {
    return this.loginRepo.update(id, updateUserDto);
  }

  async remove(id: string): Promise<boolean> {
    return this.findById(id).then((user) => !!user?.remove());
  }
}
