import {
    HttpCode,
    Controller,
    UseInterceptors,
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
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(){}
}