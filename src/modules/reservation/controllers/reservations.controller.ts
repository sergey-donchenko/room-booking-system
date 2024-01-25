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
    ClassSerializerInterceptor, BadRequestException, Get, Query, Patch
} from "@nestjs/common"

import {
    ApiTags,
    ApiOperation,
    ApiOkResponse, ApiBadRequestResponse,
} from "@nestjs/swagger"

import {
    HotelsService,
    HotelRoomsService
} from "../../hotel/services"
import {GROUP_USER} from "../../user/user.constant";
import {GROUP_ALL_HOTEL_ROOMS, GROUP_ALL_HOTELS, GROUP_HOTEL_ROOM} from "../../hotel/constants";
import {CacheInterceptor, CacheTTL} from "@nestjs/cache-manager";
import {QueryParamsDTO} from "../../../common/dto/queryParams.dto";
import {QueryRoomAvailabilityParamsDTO} from "../dto/queryRoomsAvailability.dto";

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
    @Get('/rooms-availability')
    @HttpCode(HttpStatus.OK)
    //@UseInterceptors(CacheInterceptor)
    @SerializeOptions({
        groups: [ GROUP_ALL_HOTEL_ROOMS ]
    })
    @ApiOperation({summary: 'Provides rooms availability.'})
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The list of the available rooms in the system.',
        schema: {
            example: {
                "data": {
                    "rooms": [
                        {
                            "id": "0252dad9-212f-4225-8813-4bcd9da7cd6b",
                            "title": "105",
                            "description": "Dens ventus adeptio subito auditor tolero ante. Cibus spes candidus adduco. Appello apud carmen.",
                            "createdAt": "2024-01-24T14:33:05.749Z",
                            "updatedAt": "2024-01-24T14:33:05.749Z"
                        }
                    ],
                    "total": 26,
                    "page": 0,
                    "limit": 10,
                    "keywords": "",
                    "startDate": "2024-01-31T00:00:00.000Z",
                    "endDate": "2024-02-01T00:00:00.000Z"
                },
                "success": true,
                "path": "/reservations/rooms-availability?startDate=2024-01-31&endDate=2024-02-01",
                "status": 200
            }
        },
    })
    async getRoomsAvailability(
        @Query() queryParams: QueryRoomAvailabilityParamsDTO,
    ): Promise<any> {
        const {
            page,
            limit,
            keywords,
            endDate=null,
            startDate=null
        } = queryParams || {};

        // Build busy room query
        const busyRooms: any = this.reservationsService.buildBusyRoomQuery(startDate, endDate)

        const [rooms, total] = await this.hotelRoomsService
            .getRoomsByAvailability(busyRooms, {
                page,
                limit,
                keywords,
                startDate,
                endDate
            })

        return {
            rooms,
            total,
            page,
            limit,
            keywords,
            startDate,
            endDate
        };
    }

    @Public()
    @Post('/:roomId/book')
    @HttpCode(HttpStatus.CREATED)
    @SerializeOptions({
        groups: [
            GROUP_USER,
            GROUP_HOTEL_ROOM,
            GROUP_RESERVATION
        ]
    })
    @ApiOperation({summary: 'Book the room.'})
    @ApiOkResponse({
        status: HttpStatus.CREATED,
        description: 'Create a reservation of the room for the specific date.',
        schema: {
            example: {
                "data": {
                    "reservation": {
                        "room": {
                            "id": "853af878-1a61-49f9-8801-c2203fa9f642",
                            "title": "152",
                            "description": "Turba cursim speculum sto.",
                            "createdAt": "2024-01-24T14:33:05.746Z",
                            "updatedAt": "2024-01-24T14:33:05.746Z"
                        },
                        "user": {
                            "id": "43a54d35-dd62-410d-91ab-b35324e620d4",
                            "email": "sergey.donchenko@gmail.com",
                            "fullname": "Serhii",
                            "address": null,
                            "phone": "+380663665112",
                            "createdAt": "2024-01-24T16:17:13.226Z",
                            "updatedAt": "2024-01-24T16:17:13.226Z"
                        },
                        "comment": "Just a simple comment",
                        "endDate": "2024-02-22T00:00:00.000Z",
                        "startDate": "2024-02-17T00:00:00.000Z",
                        "status": 1,
                        "id": "85be7d50-060f-4de0-ba3f-8e601decf0d7",
                        "createdAt": "2024-01-24T18:50:52.528Z",
                        "updatedAt": "2024-01-24T18:50:52.528Z"
                    }
                },
                "success": true,
                "path": "/reservations/853af878-1a61-49f9-8801-c2203fa9f642/book",
                "status": 201
            }
        },
    })
    @ApiBadRequestResponse({
        schema: {
            example: {
                "data": {},
                "success": false,
                "status": 400,
                "message": "Room is not available at that date range.",
                "timestamp": "2024-01-24T20:23:50.663Z",
                "path": "/reservations/853af878-1a61-49f9-8801-c2203fa9f642/book"
            }
        }
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

        // Check if room is available for the reservation
        const canRoomBeBooked: boolean = await this.reservationsService
            .isRoomAvailableForReservation(
                room,
                startDate,
                endDate
            );

        if (!canRoomBeBooked) {
            throw new BadRequestException('Room is not available at that date range.');
        }

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

    @Public()
    @Get('/:reservationId')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(CacheInterceptor)
    @SerializeOptions({
        groups: [
            GROUP_USER,
            GROUP_HOTEL_ROOM,
            GROUP_RESERVATION
        ]
    })
    @ApiOperation({summary: 'Provides the reservation\'s details.'})
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The list of hotels in the system.',
        schema: {
            example: {
                "data": {
                    "reservation": {
                        "id": "85be7d50-060f-4de0-ba3f-8e601decf0d7",
                        "comment": "Just a simple comment",
                        "startDate": "2024-02-17T00:00:00.000Z",
                        "endDate": "2024-02-22T00:00:00.000Z",
                        "createdAt": "2024-01-24T18:50:52.528Z",
                        "updatedAt": "2024-01-24T18:50:52.528Z",
                        "user": {
                            "id": "43a54d35-dd62-410d-91ab-b35324e620d4",
                            "email": "sergey.donchenko@gmail.com",
                            "fullname": "Serhii",
                            "address": null,
                            "phone": "+380663665112",
                            "createdAt": "2024-01-24T16:17:13.226Z",
                            "updatedAt": "2024-01-24T16:17:13.226Z"
                        },
                        "room": {
                            "id": "853af878-1a61-49f9-8801-c2203fa9f642",
                            "title": "152",
                            "description": "Turba cursim speculum sto.",
                            "createdAt": "2024-01-24T14:33:05.746Z",
                            "updatedAt": "2024-01-24T14:33:05.746Z"
                        }
                    }
                },
                "success": true,
                "path": "/reservations/85be7d50-060f-4de0-ba3f-8e601decf0d7",
                "status": 200
            }
        },
    })
    async getReservationById(
        @Param('reservationId') reservationId: string
    ): Promise<any> {
        const reservation = await this.reservationsService
            .get(
                reservationId,
                true,
                { user: true, room: true }
            )

        return {
            reservation
        };
    }

    @Public()
    @Patch('/:reservationId/cancel')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(CacheInterceptor)
    @SerializeOptions({
        groups: [
            GROUP_USER,
            GROUP_HOTEL_ROOM,
            GROUP_RESERVATION
        ]
    })
    @ApiOperation({summary: 'Provides the reservation\'s details.'})
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The list of hotels in the system.',
        schema: {
            example: {
                "data": {
                    "reservation": {
                        "id": "85be7d50-060f-4de0-ba3f-8e601decf0d7",
                        "comment": "Just a simple comment",
                        "startDate": "2024-02-17T00:00:00.000Z",
                        "endDate": "2024-02-22T00:00:00.000Z",
                        "status": -1,
                        "createdAt": "2024-01-24T18:50:52.528Z",
                        "updatedAt": "2024-01-24T21:26:37.618Z",
                        "user": {
                            "id": "43a54d35-dd62-410d-91ab-b35324e620d4",
                            "email": "sergey.donchenko@gmail.com",
                            "fullname": "Serhii",
                            "address": null,
                            "phone": "+380663665112",
                            "createdAt": "2024-01-24T16:17:13.226Z",
                            "updatedAt": "2024-01-24T16:17:13.226Z"
                        },
                        "room": {
                            "id": "853af878-1a61-49f9-8801-c2203fa9f642",
                            "title": "152",
                            "description": "Turba cursim speculum sto.",
                            "createdAt": "2024-01-24T14:33:05.746Z",
                            "updatedAt": "2024-01-24T14:33:05.746Z"
                        }
                    }
                },
                "success": true,
                "path": "/reservations/85be7d50-060f-4de0-ba3f-8e601decf0d7/cancel",
                "status": 200
            }
        },
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Exception when user tries to cancel reservation one more time.',
        schema: {
            example: {
                "data": {},
                "success": false,
                "status": 400,
                "message": "Room reservation has been already cancelled.",
                "timestamp": "2024-01-24T21:31:14.778Z",
                "path": "/reservations/85be7d50-060f-4de0-ba3f-8e601decf0d7/cancel"
            }
        },
    })
    async setReservationCancelledById(
        @Param('reservationId') reservationId: string
    ): Promise<any> {
        const reservation = await this.reservationsService
            .get(
                reservationId,
                true,
                { user: true, room: true }
            )

        if (this.reservationsService.isStatusCancelled(reservation)) {
            throw new BadRequestException('Room reservation has been already cancelled.');
        }

        // update the status
        const updatedReservation = await this.reservationsService
            .setStatusCancelled(reservation)

        // Emit event on reservation cancelled
        this.emitter.emitReservationCancelledEvent(updatedReservation)

        return {
            reservation: updatedReservation
        };
    }


}