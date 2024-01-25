import {QueryParamsDTO} from "../../../common/dto/queryParams.dto";
import {IsDate, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class QueryRoomAvailabilityParamsDTO extends QueryParamsDTO {
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    @ApiPropertyOptional({
        required: false,
        title: 'Start date',
        description: 'The filtration query param for start date.',
    })
    public startDate: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    @ApiPropertyOptional({
        required: false,
        title: 'End date',
        description: 'The filtration query param for end date.',
    })
    public endDate: Date;
}