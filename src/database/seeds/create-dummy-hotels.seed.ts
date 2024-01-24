import {DataSource} from "typeorm"
import {faker} from "@faker-js/faker"
import {Seeder} from "typeorm-extension"
import {HotelEntity, HotelRoomEntity} from "../../modules/hotel/entities"
import {SeederFactoryManager} from "typeorm-extension/dist/seeder/factory"

export default class CreateDummyHotelsSeed implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const roomRepository = dataSource.getRepository(HotelRoomEntity);

        const hotelFactory = await factoryManager.get(HotelEntity);
        const hotelRoomFactory = factoryManager.get(HotelRoomEntity);

        // Create hotels
        const hotels = await hotelFactory.saveMany(5);

        // Create 26 rooms randomly for the hotels
        const rooms = await Promise.all(
            Array(26)
                .fill("")
                .map(async () => {
                    const room = await hotelRoomFactory.make({
                        hotel: faker.helpers.arrayElement(hotels)
                    })

                    return room
                })
        );

        await roomRepository.save(rooms);
    }
}
