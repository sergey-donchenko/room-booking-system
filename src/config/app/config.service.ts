import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get name(): string {
    return this.configService.get<string>('app.name');
  }
  get description(): string {
    return this.configService.get<string>('app.description');
  }

  get adminEmails(): string {
    return this.configService.get<string>('app.admin_emails');
  }
  get version(): string {
    return this.configService.get<string>('app.version');
  }

  get recoveryURL(): string {
    return this.configService.get<string>('app.recovery_url');
  }

  /**
   * @desc Amount of minutes when the confirmation link stays alive
   **/
  get recoveryExpirationIn(): number {
    return this.configService.get<number>('app.recovery_expiration');
  }

  /**
   * @desc Build recovery URL
   * @param {string} id
   * @return {string}
   **/
  buildRecoveryConfirmationLink(id: string): string {
    return `${this.url}${this.recoveryURL}/${id}`;
  }

  get systemVersion(): string {
    return this.configService.get<string>('app.system_version');
  }

  get prefix(): string {
    return this.configService.get<string>('app.prefix');
  }

  get viewTemplate(): string {
    return this.configService.get<string>('app.viewTemplate');
  }

  get env(): string {
    return this.configService.get<string>('app.env');
  }
  get url(): string {
    return this.configService.get<string>('app.url');
  }
  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  get jwtSecret(): string {
    return this.configService.get<string>('app.jwt_secret');
  }
  get jwtExpiresIn(): string {
    return this.configService.get<string>('app.jwt_expires_in');
  }

  isDevelopmentEnv(): boolean {
    return this.env === 'development';
  }
}
