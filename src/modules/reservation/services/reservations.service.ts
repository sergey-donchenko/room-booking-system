import {IReservation} from "../interfaces"
import {ReservationEntity} from "../entities"
import {Brackets, Repository} from "typeorm"
import {InjectRepository} from "@nestjs/typeorm"
import {Injectable, NotFoundException} from "@nestjs/common"
import {IHotelRoom} from "../../hotel/interfaces";
import {EReservationStatus} from "../enum/reservation.enum";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(ReservationEntity)
        private readonly reservationRepository: Repository<ReservationEntity>,
    ) {}

    async get(
        id: string,
        required = true,
        relations?: any
    ) {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
            relations: relations || {},
        });

        if (required && !reservation) {
            throw new NotFoundException(`There isn't any reservation with id: ${id}`);
        }

        return reservation;
    }

    async createReservation(input: Partial<IReservation>): Promise<IReservation> {
        return this.reservationRepository.save(input);
    }

    buildAvailabilityQuery(startDate?: Date, endDate?: Date): SelectQueryBuilder<ReservationEntity> {
        const query = this.reservationRepository
            .createQueryBuilder('reservations')
            .where('reservations.status = :status', { status: EReservationStatus.ACTIVE });

        if (!startDate || !endDate) {
            return query.andWhere('reservations.endDate > :endDate', {endDate: new Date()})
        }

        return query.andWhere(new Brackets((qb) => {
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
    }

    buildBusyRoomQuery(startDate?: Date, endDate?: Date):SelectQueryBuilder<ReservationEntity> {
        return this.buildAvailabilityQuery(startDate, endDate)
            .innerJoin('reservations.room', 'room')
            .select('room.id')
    }

    async isRoomAvailableForReservation(
        room: IHotelRoom,
        startDate: Date,
        endDate: Date
    ): Promise<boolean> {
        // if operation is in the past
        if (startDate.getTime() < Date.now() || endDate.getTime() < Date.now()) return false

        const reservation: boolean = await this.buildAvailabilityQuery(startDate, endDate)
            .andWhere('reservations.roomId = :roomId', { roomId: room?.id })
            .getExists()

        return !reservation
    }

    async setStatusCancelled(reservation: IReservation): Promise<IReservation> {
        return this.reservationRepository.save({
            ...reservation,
            status: EReservationStatus.CANCELLED,
            updatedAt: new Date()
        })
    }

    isStatusCancelled(reservation: IReservation): boolean {
        return reservation?.status === EReservationStatus.CANCELLED
    }

}
