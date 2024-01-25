import {Module} from "@nestjs/common"
import {EventEmitterModule} from "@nestjs/event-emitter"
import {AppConfigModule} from "./config/app/config.module"
import {ReservationModule} from "./modules/reservation/reservation.module"
import {HotelModule} from "./modules/hotel/hotel.module"
import {UserModule} from "./modules/user/user.module"
import {MailConfigModule} from "./config/mail/config.module"
import {MailProviderModule} from "./providers/email/provider.module"
import {PostgresDatabaseProviderModule} from "./providers/database/postgres/provider.module"
import {CacheModule} from "@nestjs/cache-manager"
import * as redisStore from "cache-manager-redis-store"
import {CacheProviderConfigModule} from "./config/cache/config.module";
import {CacheProviderConfigService} from "./config/cache/config.service";
import {QueueConfigModule} from "./config/queue/config.module";
import {BullModule} from "@nestjs/bull";
import {QueueConfigService} from "./config/queue/config.service";

@Module({
    imports: [
        UserModule,
        HotelModule,
        AppConfigModule,
        MailConfigModule,
        ReservationModule,
        QueueConfigModule,
        MailProviderModule,
        CacheProviderConfigModule,
        EventEmitterModule.forRoot(),
        CacheModule.registerAsync({
            imports: [CacheProviderConfigModule],
            isGlobal: true,
            useFactory: async (cacheConfigService: CacheProviderConfigService) => ({
                store: redisStore,
                host: cacheConfigService.host,
                port: cacheConfigService.port,
                password: cacheConfigService.password,
                username: cacheConfigService.username,
                no_ready_check: true,
            }),
            inject: [CacheProviderConfigService]
        }),
        BullModule.forRootAsync({
            imports: [QueueConfigModule],
            useFactory: async (queueConfigService: QueueConfigService) => ({
                redis: {
                    host: queueConfigService.host,
                    port: queueConfigService.port,
                    password: queueConfigService.password,
                    username: queueConfigService.username
                }
            }),
            inject: [QueueConfigService]
        }),
        PostgresDatabaseProviderModule,
    ]
})
export class AppModule {
}
