import { ReservationsController } from "./controllers"
import { ReservationEntity } from "./entities"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Module, forwardRef } from "@nestjs/common"
import {ReservationsService} from "./services";
import {HotelModule} from "../hotel/hotel.module";
import {UserModule} from "../user/user.module";
import {ReservationEmitter} from "./events/emitters";

@Module({
  imports: [
    forwardRef(() => HotelModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([
      ReservationEntity
    ]),
  ],
  controllers: [ ReservationsController ],
  providers: [
    ReservationsService,
    ReservationEmitter
  ],
  exports: [
    ReservationsService
  ],
})
export class ReservationModule {}
