import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {strToBool} from "../../utils/transformation.util";

/**
 * Service dealing with database config based operations.
 *
 * @class
 */
@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get type(): string {
    return this.configService.get<string>('database.type');
  }
  get host(): string {
    return this.configService.get<string>('database.host');
  }

  get url(): string {
    return this.configService.get<string>('database.url');
  }

  get useSSLMode(): boolean {
    return strToBool(this.configService.get<string>('database.use_ssl'));
  }
  get logging(): string | string[] {
    return this.configService.get<string>('database.logging');
  }

  get loading(): boolean {
    return this.configService.get<boolean>('database.loading');
  }
  get autoLoadEntities(): boolean {
    return this.configService.get<boolean>('database.autoLoadEntities');
  }

  get synchronize(): boolean {
    return this.configService.get<boolean>('database.synchronize');
  }

  get entities(): string[] {
    return this.configService.get<string[]>('database.entities');
  }
  get migrations(): string[] {
    return this.configService.get<string[]>('database.migrations');
  }

  get port(): number {
    return Number(this.configService.get<string>('database.port'));
  }
  get username(): string {
    return this.configService.get<string>('database.username');
  }

  get password(): string {
    return this.configService.get<string>('database.password');
  }
  get name(): string {
    return this.configService.get<string>('database.database');
  }
}
