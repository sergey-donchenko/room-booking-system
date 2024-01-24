import { IReservation } from "../interfaces"
import { ReservationEntity } from "../entities"
import { Repository, ILike } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Injectable, NotFoundException } from "@nestjs/common"

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

    async isRoomAvailableForReservation(): Promise<boolean> {
        return true
    }
}
