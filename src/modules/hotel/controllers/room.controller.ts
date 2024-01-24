import {GROUP_HOTEL_ROOM} from "../constants"
import {HotelRoomsService} from "../services"
import { Public } from "../../../common/decorators/public.decorator"
import {QueryParamsDTO} from "../../../common/dto/queryParams.dto";

import {
    Get,
    Query,
    HttpCode,
    HttpStatus,
    Controller,
    UseInterceptors,
    SerializeOptions,
    ClassSerializerInterceptor
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


@ApiTags('The hotel room API ')
@Controller('rooms')
@UseInterceptors(ClassSerializerInterceptor)
export class HotelRoomsController {
    constructor(
        private readonly hotelRoomsService: HotelRoomsService
    ) {
    }

    @Public()
    @Get('/:roomId')
    @HttpCode(HttpStatus.OK)
    @SerializeOptions({groups: [GROUP_HOTEL_ROOM]})
    @ApiOperation({summary: 'Retrieve the room details.'})
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'Retrieve the room details',
        schema: {
            example: {
                "data": {}
            }
        },
    })
    async getRoomById(
        @Query() queryParams: QueryParamsDTO,
    ): Promise<any> {


        return {

        };
    }
}