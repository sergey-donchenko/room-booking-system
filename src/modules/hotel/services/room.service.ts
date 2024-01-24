import {IHotel, IHotelRoom} from "../interfaces"
import {HotelEntity, HotelRoomEntity} from "../entities"
import { Repository, ILike } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Injectable, NotFoundException } from "@nestjs/common"
import { IFindOptions } from "../../../common/interfaces/query.interface"
import {ESystemStatus} from "../../../common/enum/status.enum";

@Injectable()
export class HotelRoomsService {
    constructor(
        @InjectRepository(HotelRoomEntity)
        private readonly hotelRoomRepository: Repository<HotelRoomEntity>,
    ) {}

    async get(id: string, required = true) {
        const room = await this.hotelRoomRepository.findOneBy({ id });

        if (required && !room) {
            throw new NotFoundException(`There isn't any hotel room with such id: ${id}`);
        }

        return room;
    }

    async getActiveRoomsByHotel(
        hotel: IHotel,
        options?: IFindOptions
    ): Promise<[IHotelRoom[], number]> {
        const { limit = 10, page = 0, keywords = '' } = options || {};

        const query: any = this.hotelRoomRepository
            .createQueryBuilder('rooms')
            .innerJoin('rooms.hotel', 'hotel')
            .where('hotel.id = :id', { id: hotel?.id })
            .andWhere('rooms.status = :status', { status: ESystemStatus.ENABLED })
            .skip(page * limit)
            .take(limit)
            .orderBy({
                'rooms.title': 'ASC'
            });

        if (keywords && keywords?.length) {
            query.andWhere('rooms.title ilike :title', { title: `%${keywords}%` });
        }

        return query.getManyAndCount();
    }
}
