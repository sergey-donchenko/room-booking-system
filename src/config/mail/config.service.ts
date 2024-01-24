import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {MAIL_PROVIDER_MAILGUN, MAIL_PROVIDER_MAILJET} from './constants';

/**
 * Service dealing with email config based operations.
 *
 * @class
 */
@Injectable()
export class MailConfigService {
  constructor(private configService: ConfigService) {}

  get provider(): string {
    return this.configService.get<string>('mail.provider');
  }
  get key(): string {
    return this.configService.get<string>('mail.key');
  }
  get secret(): string {
    return this.configService.get<string>('mail.secret');
  }

  get domain(): string {
    return this.configService.get<string>('mail.domain');
  }

  get from(): string {
    return this.configService.get<string>('mail.from');
  }

  get fromEmail(): string {
    return this.configService.get<string>('mail.from_email');
  }
  get fromName(): string {
    return this.configService.get<string>('mail.from_name');
  }

  isProviderMailgun(): boolean {
    return this.provider === MAIL_PROVIDER_MAILGUN;
  }

  isProviderMailjet(): boolean {
    return this.provider === MAIL_PROVIDER_MAILJET;
  }
}
