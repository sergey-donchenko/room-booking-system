import {EReservationStatus} from "../enum/reservation.enum";

export interface IReservation {
    id: string;
    room?: any;
    user?: any;
    comment?: string;
    startDate: Date;
    endDate: Date;
    status: EReservationStatus;
    createdAt: Date;
    updatedAt: Date;
}

