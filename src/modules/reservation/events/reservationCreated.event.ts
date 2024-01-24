import { IReservation } from "../interfaces"

export const EVENT_RESERVATION_CREATED = 'reservation.created';

export class ReservationCreatedEvent {
  constructor(public readonly reservation: IReservation) {}
}
