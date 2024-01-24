import {Injectable} from "@nestjs/common"
import {ESystemStatus} from "../enum/status.enum"
import {IHotelRoom} from "../../modules/hotel/interfaces"
import {HotelRoomsService} from "../../modules/hotel/services"

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class isRoomAvailable implements ValidatorConstraintInterface {
  constructor(private readonly hotelRoomService: HotelRoomsService) {}

  validate(roomId: string) {
    return this.hotelRoomService.get(roomId, false).then((room:IHotelRoom) => {
      return (room?.id && room?.status === ESystemStatus.ENABLED);
    });
  }
}

export function RoomIsAvailable(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: isRoomAvailable,
    });
  };
}
