import {HotelController} from "./controllers"
import {TypeOrmModule} from "@nestjs/typeorm"
import {Module, forwardRef} from "@nestjs/common"
import {HotelEntity, HotelRoomEntity} from "./entities";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            HotelEntity,
            HotelRoomEntity
        ]),
    ],
    controllers: [HotelController],
    providers: [],
    exports: [],
})
export class HotelModule {
}
