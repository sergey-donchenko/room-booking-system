import { IReservation } from "../interfaces"
import { IUser } from "../../user/interfaces"
import { ReservationsService } from "../services"
import { UsersService } from "../../user/services"
import { IHotelRoom } from "../../hotel/interfaces"
import { ReservationEmitter } from "../events/emitters"
import { Public } from "../../../common/decorators/public.decorator"
import { GROUP_RESERVATION } from "../reservation.constants"
import { CreateReservationDTO } from "../dto/createReservation.dto";

import {
    Post,
    Body,
    Param,
    HttpCode,
    HttpStatus,
    Controller,
    UseInterceptors,
    SerializeOptions,
    ClassSerializerInterceptor
} from "@nestjs/common"

import {
    ApiTags,
    ApiOperation,
    ApiOkResponse,
} from "@nestjs/swagger"

import {
    HotelsService,
    HotelRoomsService
} from "../../hotel/services"

@ApiTags('The reservations API')
@Controller('reservations')
@UseInterceptors(ClassSerializerInterceptor)
export class ReservationsController {
    constructor(
        private readonly hotelsService: HotelsService,
        private readonly hotelRoomsService: HotelRoomsService,
        private readonly reservationsService: ReservationsService,
        private readonly usersService: UsersService,
        private readonly emitter: ReservationEmitter
    ) {
    }

    @Public()
    @Post('/:roomId/book')
    @HttpCode(HttpStatus.CREATED)
    @SerializeOptions({groups: [GROUP_RESERVATION]})
    @ApiOperation({summary: 'Book the room.'})
    @ApiOkResponse({
        status: HttpStatus.CREATED,
        description: 'Create a reservation of the room for the specific date.',
        schema: {
            example: {

            }
        },
    })
    async bookTheRoom(
        @Param('roomId') roomId: string,
        @Body() bookRoomDTO: CreateReservationDTO
    ): Promise<any> {
        const {
            comment,
            endDate,
            startDate,
            clientName,
            clientPhone,
            clientEmail
        } = bookRoomDTO

        // get room by identifier
        const room: IHotelRoom = await this.hotelRoomsService.get(roomId, true)

        // find or create user
        const user: IUser = await this.usersService.findOrCreateUser({
            email: clientEmail,
            phone: clientPhone,
            fullname: clientName
        })

        // Create reservation
        const reservation: IReservation = await this.reservationsService.createReservation({
            room,
            user,
            comment,
            endDate,
            startDate,
        })

        // Emit create reservation event
        this.emitter.emitReservationCreatedEvent(reservation)

        return {
            reservation
        }
    }
}