import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserEntity } from '../entities';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectRepository(AuthUserEntity)
    private userRepo: Repository<AuthUserEntity>
  ) {}

  async create(
    createUserDto: Partial<AuthUserEntity>
  ): Promise<AuthUserEntity> {
    const createdUser = this.userRepo.create(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<AuthUserEntity[]> {
    return this.userRepo.find();
  }

  async findById(userId: string): Promise<AuthUserEntity | null> {
    return this.userRepo.findOne({ where: { userId } });
  }

  async findByEmail(email: string): Promise<AuthUserEntity | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async update(
    id: string,
    updateUserDto: Partial<AuthUserEntity>
  ): Promise<UpdateResult> {
    return this.userRepo.update(id, updateUserDto);
  }

  async remove(id: string): Promise<boolean> {
    return this.findById(id).then((user) => !!user?.remove());
  }
}
