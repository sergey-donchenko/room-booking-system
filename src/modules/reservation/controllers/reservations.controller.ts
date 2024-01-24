import {
    HttpCode,
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor, Get, HttpStatus, SerializeOptions, Query, Post, Body, Param
} from '@nestjs/common';

import {
    ApiBody,
    ApiTags,
    ApiHeader,
    ApiOperation,
    ApiOkResponse,
    ApiForbiddenResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {HotelRoomsService, HotelsService} from "../../hotel/services";
import {Public} from "../../../common/decorators/public.decorator";
import {GROUP_ALL_HOTELS} from "../../hotel/constants";
import {QueryParamsDTO} from "../../../common/dto/queryParams.dto";
import {GROUP_RESERVATION} from "../reservation.constants";
import {CreateReservationDTO} from "../dto/createReservation.dto";
import {ReservationsService} from "../services";
import {IHotelRoom} from "../../hotel/interfaces";
import {IUser} from "../../user/interfaces";
import {UsersService} from "../../user/services";

@ApiTags('The reservations API')
@Controller('reservations')
@UseInterceptors(ClassSerializerInterceptor)
export class ReservationsController {
    constructor(
        private readonly hotelsService: HotelsService,
        private readonly hotelRoomsService: HotelRoomsService,
        private readonly reservationsService: ReservationsService,
        private readonly usersService: UsersService,
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

        const reservation = await this.reservationsService.createReservation({
            room,
            user,
            comment,
            endDate,
            startDate,
        })

        return {}
    }
}