import { ApiProperty } from "@nestjs/swagger"

import {
  IsDate,
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber
} from "class-validator"

export class CreateReservationDTO {
  @ApiProperty({
    required: true,
    description: 'The reservation start date.'
  })
  @IsDate({message: 'Value should have the proper date format.'})
  @IsNotEmpty({ message: 'The start date of the reservation is required field.' })
  startDate: Date = null;

  @ApiProperty({
    description: 'The reservation end date.'
  })
  @IsDate({message: 'Value should have the proper date format.'})
  @IsNotEmpty({ message: 'The end date of the reservation is required field.' })
  endDate: Date = null;

  @IsString()
  @ApiProperty({
    required: true,
    description: 'Client\'s name',
    example: 'Donchenko Serhii'
  })
  @IsNotEmpty({ message: 'The client name is required.' })
  clientName: string;

  @IsString()
  @ApiProperty({
    required: true,
    description: 'Client\'s email',
    example: 'client@example.com'
  })
  @IsEmail(undefined, { message: 'Email is required.' })
  clientEmail: string;

  @ApiProperty({
    description: 'Client\'s phone number',
    example: '+1(111)111-11-11'
  })
  @IsOptional()
  @IsPhoneNumber(undefined, {
    message: 'The phone number must be registered in UA.',
  })
  clientPhone: string;

  @IsString()
  @ApiProperty({
    description: 'The reservation comment ',
    example: 'I want the silent'
  })
  @IsOptional()
  comment: string;
}
