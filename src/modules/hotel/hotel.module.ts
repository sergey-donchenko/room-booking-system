import {TypeOrmModule} from "@nestjs/typeorm"
import {Module, forwardRef} from "@nestjs/common"

import {
    HotelController,
    HotelRoomsController
} from "./controllers"

import {
    HotelEntity,
    HotelRoomEntity
} from "./entities"

import {
    HotelsService,
    HotelRoomsService
} from "./services";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            HotelEntity,
            HotelRoomEntity
        ]),
    ],
    controllers: [
        HotelController,
        HotelRoomsController
    ],
    providers: [
        HotelsService,
        HotelRoomsService
    ],
    exports: [
        HotelsService,
        HotelRoomsService
    ],
})
export class HotelModule {
}
