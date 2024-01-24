import { IHotel } from "../interfaces"
import { HotelEntity } from "../entities"
import { Repository, ILike } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Injectable, NotFoundException } from "@nestjs/common"
import { IFindOptions } from "../../../common/interfaces/query.interface"

@Injectable()
export class HotelsService {
    constructor(
        @InjectRepository(HotelEntity)
        private readonly hotelRepository: Repository<HotelEntity>,
    ) {}

    async get(id: string, required = true) {
        const hotel = await this.hotelRepository.findOneBy({ id });

        if (required && !hotel) {
            throw new NotFoundException(`There isn't any hotel with id: ${id}`);
        }

        return hotel;
    }

    async getActiveHotels(options?: IFindOptions): Promise<[IHotel[], number]> {
        const whereParams: any = { status: 1 };
        const { limit = 10, page = 0, keywords = '' } = options || {};

        if (keywords?.length) {
            whereParams.title = ILike(`%${keywords}%`);
        }

        return this.hotelRepository.findAndCount({
            where: whereParams,
            skip: page * limit,
            take: limit,
            order: { title: 'ASC' },
        });
    }
}
