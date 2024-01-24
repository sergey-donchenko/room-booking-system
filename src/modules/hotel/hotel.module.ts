import {HotelController} from "./controllers"
import {TypeOrmModule} from "@nestjs/typeorm"
import {Module, forwardRef} from "@nestjs/common"
import {HotelEntity, HotelRoomEntity} from "./entities";
import {HotelsService} from "./services/hotel.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            HotelEntity,
            HotelRoomEntity
        ]),
    ],
    controllers: [HotelController],
    providers: [
        HotelsService
    ],
    exports: [
        HotelsService
    ],
})
export class HotelModule {
}
