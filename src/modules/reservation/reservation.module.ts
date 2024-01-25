import {ReservationsController} from "./controllers"
import {ReservationEntity} from "./entities"
import {TypeOrmModule} from "@nestjs/typeorm"
import {Module, forwardRef} from "@nestjs/common"
import {ReservationsService} from "./services";
import {HotelModule} from "../hotel/hotel.module";
import {UserModule} from "../user/user.module";
import {ReservationEmitter} from "./events/emitters";

import {
    ReservationCancelledListener,
    ReservationCreatedListener
} from "./events/listeners"
import {MailProviderModule} from "../../providers/email/provider.module";
import {MailConsumer} from "./jobs";
import {BullModule} from "@nestjs/bull";
import {QUEUE_MAIL} from "../../common/constants/queue.constants";

@Module({
    imports: [
        forwardRef(() => HotelModule),
        forwardRef(() => UserModule),
        TypeOrmModule.forFeature([
            ReservationEntity
        ]),
        BullModule.registerQueue({
            name: QUEUE_MAIL
        })
    ],
    controllers: [ReservationsController],
    providers: [
        MailConsumer,
        ReservationsService,
        ReservationEmitter,
        ReservationCancelledListener,
        ReservationCreatedListener
    ],
    exports: [
        ReservationsService
    ],
})
export class ReservationModule {
}
