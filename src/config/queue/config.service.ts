import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

/**
 * Service dealing with queue config based operations.
 *
 * @class
 */
@Injectable()
export class QueueConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('queue.host');
  }

  get port(): number {
    return Number(this.configService.get<string>('queue.port'));
  }

  get username(): string {
    return this.configService.get<string>('queue.username');
  }

  get password(): string {
    return this.configService.get<string>('queue.password');
  }
}
