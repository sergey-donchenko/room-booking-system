import { Module } from "@nestjs/common"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { AppConfigModule } from "./config/app/config.module"
import { ReservationModule } from "./modules/reservation/reservation.module"
import { HotelModule } from "./modules/hotel/hotel.module"
import { UserModule } from "./modules/user/user.module"
import { MailConfigModule } from "./config/mail/config.module"
import { MailProviderModule } from "./providers/email/provider.module"
import { PostgresDatabaseProviderModule } from "./providers/database/postgres/provider.module"

@Module({
  imports: [
    UserModule,
    HotelModule,
    AppConfigModule,
    MailConfigModule,
    ReservationModule,
    MailProviderModule,
    EventEmitterModule.forRoot(),
    PostgresDatabaseProviderModule
  ]
})
export class AppModule {}
