import { IReservation } from "../../interfaces"
import { Injectable, Logger } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"

import {
  ReservationCreatedEvent,
  EVENT_RESERVATION_CREATED,
} from '../reservationCreated.event';

@Injectable()
export class ReservationEmitter {
  private readonly logger = new Logger(ReservationEmitter.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  /**
   * @desc Generates event on reservation created
   * @param {IReservation} reservation
   * @return {boolean}
   **/
  emitReservationCreatedEvent(reservation: IReservation): boolean {
    this.logger.debug(`Emitting "${EVENT_RESERVATION_CREATED}" event.`);
    this.eventEmitter
      .emitAsync(EVENT_RESERVATION_CREATED, new ReservationCreatedEvent(reservation))
      .then(() =>
        this.logger.debug(
          `Event "${EVENT_RESERVATION_CREATED}" has just been handled.`,
        ),
      );

    return true;
  }
}
