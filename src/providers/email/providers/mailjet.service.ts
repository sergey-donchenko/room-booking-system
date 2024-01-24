const Mailjet = require('node-mailjet')

import { Injectable } from "@nestjs/common"
import { MailConfigService } from "../../../config/mail/config.service"
import { IMailerService, ISendOptions } from "../interfaces/mailer.interface"

@Injectable()
export class MailjetEmailProviderService implements IMailerService {
  private client = new Mailjet({
    apiKey: this.config.key,
    apiSecret: this.config.secret
  });

  constructor(private readonly config: MailConfigService) {}

  /**
   * Send via API
   * @param data
   */
  async send(data: ISendOptions): Promise<any> {
    const { to, subject, body: text, bodyHTML: html } = data || {}
    const listOfTo = Array.isArray(to) ? to : [to]

    try {
      const data = await this.client
          .post("send", {'version': 'v3.1'})
          .request({
            "Messages": [{
              "From": {
                "Email": this.config.fromEmail,
                "Name": this.config.fromName
              },
              "To": listOfTo.map((to: string) => ({"Email": to, 'Name': 'Serhii'})),
              "Subject": subject,
              "TextPart": text || '',
              "HTMLPart": html || '',
            }]
          })

      return Promise.resolve(data.body)
    } catch(e: any) {
      console.error(e)
    }
  }
}
