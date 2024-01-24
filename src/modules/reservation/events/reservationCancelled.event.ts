import { IReservation } from "../interfaces"

export const EVENT_RESERVATION_CANCELLED = 'reservation.cancelled';

export class ReservationCancelledEvent {
    constructor(public readonly reservation: IReservation) {}
}
