import { HotelController } from "./controllers"
import { ReservationEntity } from "./entities"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Module, forwardRef } from "@nestjs/common"

@Module({
  imports: [

    TypeOrmModule.forFeature([
      ReservationEntity
    ]),
  ],
  controllers: [ HotelController ],
  providers: [

  ],
  exports: [

  ],
})
export class ReservationModule {}
