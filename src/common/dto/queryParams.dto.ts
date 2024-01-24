import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { toNumber } from '../helpers/transformer.helper';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class QueryParamsDTO {
  @Transform(({ value }) =>
    toNumber(value, {
      default: 0,
      min: 0,
    }),
  )
  @IsNumber({}, { message: 'Page should be a number.' })
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    minimum: 0,
    maximum: 10000,
    title: 'Page',
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    format: 'int32',
    default: 0,
  })
  public page?: number = 0;

  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: 'Page should be a number.' })
  @Transform(({ value }) =>
    toNumber(value, {
      default: 10,
      min: 1,
    }),
  )
  @ApiPropertyOptional({
    default: 10,
    description: 'The amount of retrieved records on the page.',
    title: 'Limit',
  })
  public limit?: number = 10;

  @IsString()
  @Type(() => String)
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    title: 'Keywords',
    description: 'The search keywords.',
  })
  public keywords: string = '';
}
