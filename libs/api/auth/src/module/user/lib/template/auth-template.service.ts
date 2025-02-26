import { Repository } from 'typeorm';
import { AuthTemplateEntity } from './auth-template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class AuthTemplateService {
  constructor(
    @InjectRepository(AuthTemplateEntity)
    protected authTemplateEntity: Repository<AuthTemplateEntity>
  ) {}

  async getTemplate(
    nameKey: string,
    lang: string,
    tenantId: string | undefined = undefined
  ): Promise<Partial<AuthTemplateEntity>> {
    const where: any = {
      name: nameKey,
      lang: lang,
    };

    if (tenantId) where['tenantId'] = tenantId;

    return (
      (await this.authTemplateEntity.findOne({
        where: where,
      })) || { template: '' }
    );
  }

  async findTemplate(options: FindOneOptions<AuthTemplateEntity>) {
    return this.authTemplateEntity.findOne(options);
  }
}
