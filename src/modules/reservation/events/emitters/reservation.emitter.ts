import { IReservation } from "../../interfaces"
import { Injectable, Logger } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"

import {
  ReservationCreatedEvent,
  EVENT_RESERVATION_CREATED,
} from "../reservationCreated.event"

import {
  EVENT_RESERVATION_CANCELLED,
  ReservationCancelledEvent
} from "../reservationCancelled.event"

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
  /**
   * @desc Generates event on reservation cancelled
   * @param {IReservation} reservation
   * @return {boolean}
   **/
  emitReservationCancelledEvent(reservation: IReservation): boolean {
    this.logger.debug(`Emitting "${EVENT_RESERVATION_CANCELLED}" event.`);
    this.eventEmitter
        .emitAsync(EVENT_RESERVATION_CANCELLED, new ReservationCancelledEvent(reservation))
        .then(() =>
            this.logger.debug(
                `Event "${EVENT_RESERVATION_CANCELLED}" has just been handled.`,
            ),
        );

    return true;
  }

}
