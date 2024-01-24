import { MailjetEmailProviderService } from "./providers"
import { MailConfigService } from "../../config/mail/config.service"

import {
  ISendOptions,
  IMailerService
} from "./interfaces/mailer.interface"

import {
  Injectable,
  ConflictException
} from "@nestjs/common"

@Injectable()
export class MailService implements IMailerService {
  constructor(
    private readonly config: MailConfigService,
    private readonly mailjetService: MailjetEmailProviderService
  ) {}

  isConfigurationOfServiceAvailable(): boolean {
    return !!this.config.key;
  }

  /**
   * Send email
   * @param {ISendOptions} data
   */
  async send(data: ISendOptions): Promise<any> {
    // if service is not available
    if (!this.isConfigurationOfServiceAvailable() || !data?.to) return;

    const messageBody: any = {
      from: this.config.from,
      ...data,
    };

    if (this.config.isProviderMailjet()) {
      return this.mailjetService.send(messageBody)
    }

    throw new ConflictException(
      `Email provider "${this.config.provider}" has not been implemented yet.`,
    );
  }
}
