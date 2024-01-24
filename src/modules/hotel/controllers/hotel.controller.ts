import {IHotel} from "../interfaces"
import {QueryParamsDTO} from "../../../common/dto/queryParams.dto";
import { Public } from "../../../common/decorators/public.decorator"

import {
    HotelsService,
    HotelRoomsService
} from "../services"

import {
    GROUP_HOTEL,
    GROUP_ALL_HOTELS,
    GROUP_ALL_HOTEL_ROOMS
} from "../constants"

import {
    Get,
    Query,
    HttpCode,
    HttpStatus,
    Controller,
    UseInterceptors,
    SerializeOptions,
    ClassSerializerInterceptor, Param
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
} from "@nestjs/swagger"




@ApiTags('The hotel API ')
@Controller('hotels')
@UseInterceptors(ClassSerializerInterceptor)
export class HotelController {
    constructor(
        private readonly hotelsService: HotelsService,
        private readonly hotelRoomsService: HotelRoomsService,
    ) {
    }

    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    @SerializeOptions({groups: [GROUP_ALL_HOTELS]})
    @ApiOperation({summary: 'Provides a list of active hotels in the system.'})
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The list of hotels in the system.',
        schema: {
            example: {
                "data": {
                    "page": 0,
                    "total": 5,
                    "limit": 10,
                    "hotels": [
                        {
                            "id": "f0ec43cb-a338-4147-b310-402b0e4a9c72",
                            "title": "Approbo tracto.",
                            "description": "Aestus suscipit.",
                            "stars": 2,
                            "createdAt": "2024-01-24T14:33:05.706Z",
                            "updatedAt": "2024-01-24T14:33:05.706Z"
                        }
                    ],
                    "keywords": ""
                },
                "success": true,
                "path": "/hotels",
                "status": 200
            }
        },
    })
    async getListOfTheActiveHotels(
        @Query() queryParams: QueryParamsDTO,
    ): Promise<any> {
        const {page, limit, keywords} = queryParams || {};
        const [hotels, total] = await this.hotelsService.getActiveHotels({
            page,
            limit,
            keywords,
        });

        return {
            page,
            total,
            limit,
            hotels,
            keywords,
        };
    }

    @Public()
    @Get('/:hotelId/rooms')
    @HttpCode(HttpStatus.OK)
    @SerializeOptions({
        groups: [
            GROUP_HOTEL,
            GROUP_ALL_HOTEL_ROOMS
        ]
    })
    @ApiOperation({summary: 'Provides a list of active hotel\'s room in the system.'})
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'The list of hotels in the system.',
        schema: {
            example: {
                "data": {
                    "page": 0,
                    "total": 5,
                    "limit": 10,
                    "hotels": [
                        {
                            "id": "f0ec43cb-a338-4147-b310-402b0e4a9c72",
                            "title": "Approbo tracto.",
                            "description": "Aestus suscipit.",
                            "stars": 2,
                            "createdAt": "2024-01-24T14:33:05.706Z",
                            "updatedAt": "2024-01-24T14:33:05.706Z"
                        }
                    ],
                    "keywords": ""
                },
                "success": true,
                "path": "/hotels",
                "status": 200
            }
        },
    })
    async getListOfTheRoomsByHotelIdentifier(
        @Param('hotelId') hotelId: string,
        @Query() queryParams: QueryParamsDTO,
    ): Promise<any> {
        const {page, limit, keywords} = queryParams || {};
        const hotel: IHotel = await this.hotelsService.get(hotelId, true);

        const [rooms, total]  = await this.hotelRoomsService
            .getActiveRoomsByHotel(
                hotel,
                { page, limit, keywords }
            )

        return {
            hotel,
            page,
            total,
            limit,
            rooms,
            keywords,
        };
    }
}