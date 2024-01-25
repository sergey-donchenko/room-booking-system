import {Repository} from "typeorm"
import {HotelRoomEntity} from "../entities"
import {InjectRepository} from "@nestjs/typeorm"
import {Injectable, NotFoundException} from "@nestjs/common"
import {ESystemStatus} from "../../../common/enum/status.enum"
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder"

import {
    IHotel,
    IHotelRoom,
    IFindHotelRoomOptions
} from "../interfaces"
import {EReservationStatus} from "../../reservation/enum/reservation.enum";


@Injectable()
export class HotelRoomsService {
    constructor(
        @InjectRepository(HotelRoomEntity)
        private readonly hotelRoomRepository: Repository<HotelRoomEntity>
    ) {
    }

    async get(id: string, required = true) {
        const room = await this.hotelRoomRepository.findOneBy({id});

        if (required && !room) {
            throw new NotFoundException(`There isn't any hotel room with such id: ${id}`);
        }

        return room;
    }

    private buildQueryByParams(options?: IFindHotelRoomOptions): SelectQueryBuilder<HotelRoomEntity> {
        const {limit = 10, page = 0, keywords = ''} = options || {};

        const query: any = this.hotelRoomRepository
            .createQueryBuilder('rooms')
            .where('rooms.status = :status', {status: ESystemStatus.ENABLED})
            .skip(page * limit)
            .take(limit)
            .orderBy({
                'rooms.title': 'ASC'
            });

        if (keywords && keywords?.length) {
            query.andWhere('rooms.title ilike :title', {title: `%${keywords}%`});
        }

        return query
    }

    async getActiveRoomsByHotel(
        hotel: IHotel,
        options?: IFindHotelRoomOptions
    ): Promise<[IHotelRoom[], number]> {
        return this.buildQueryByParams(options)
            .innerJoin('rooms.hotel', 'hotel')
            .andWhere('hotel.id = :id', {id: hotel?.id})
            .getManyAndCount();
    }

    async getRoomsByAvailability(
        subQuery: SelectQueryBuilder<any>,
        options?: IFindHotelRoomOptions
    ): Promise<[IHotelRoom[], number]> {
        const { startDate, endDate } = options || {}
        const parameters: any = {
            status: EReservationStatus.ACTIVE,
        }

        if (!startDate || !endDate) {
            parameters.endDate = new Date()
        } else {
            parameters.endDate = endDate
            parameters.startDate = startDate
        }

        const query = this.buildQueryByParams(options)
            .andWhere('rooms.id NOT IN (' + subQuery.getQuery() + ')', parameters)

        return query.getManyAndCount();
    }
}
