export interface IMailerService {
  send(data: ISendOptions): Promise<any>;
}

export interface ISendOptions {
  to: string | string[]
  subject: string
  body?: string
  from?: string
  bodyHTML?: string
}