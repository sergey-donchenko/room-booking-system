import { IReservation } from "../interfaces"
import { ReservationEntity } from "../entities"
import {Repository, ILike, Brackets} from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Injectable, NotFoundException } from "@nestjs/common"
import {IHotelRoom} from "../../hotel/interfaces";
import {EReservationStatus} from "../enum/reservation.enum";

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(ReservationEntity)
        private readonly reservationRepository: Repository<ReservationEntity>,
    ) {}

    async get(id: string, required = true) {
        const reservation = await this.reservationRepository.findOneBy({ id });

        if (required && !reservation) {
            throw new NotFoundException(`There isn't any reservation with id: ${id}`);
        }

        return reservation;
    }

    async createReservation(input: Partial<IReservation>): Promise<IReservation> {
        return this.reservationRepository.save(input);
    }

    async isRoomAvailableForReservation(
        room: IHotelRoom,
        startDate: Date,
        endDate: Date
    ): Promise<boolean> {
        // if operation is in the past
        if (startDate.getTime() < Date.now() || endDate.getTime() < Date.now()) return false

        const reservation: boolean = await this.reservationRepository
            .createQueryBuilder('reservations')
            .where('reservations.roomId = :roomId', { roomId: room?.id })
            .andWhere('reservations.status = :status', { status: EReservationStatus.ACTIVE })
            .andWhere(new Brackets((qb) => {
                qb
                    .where(
                        new Brackets((qs1) => {
                            qs1.where('reservations.startDate > :startDate', {startDate})
                                .andWhere('reservations.startDate < :endDate', {endDate})
                        })
                    )
                    .orWhere(
                        new Brackets((qs2) => {
                            qs2.where('reservations.endDate > :startDate', {startDate})
                                .andWhere('reservations.endDate < :endDate', {endDate})
                        })
                    )
            }))
            .getExists()

        return !reservation
    }
}
