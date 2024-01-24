import {GROUP_ALL_HOTELS} from "../constants"
import { Public } from "../../../common/decorators/public.decorator"

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
import {QueryParamsDTO} from "../../../common/dto/queryParams.dto";
import {HotelsService} from "../services/hotel.service";


@ApiTags('The hotel API ')
@Controller('hotels')
@UseInterceptors(ClassSerializerInterceptor)
export class HotelController {
    constructor(
        private readonly hotelsService: HotelsService
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
}