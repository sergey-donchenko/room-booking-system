import { setSeederFactory } from "typeorm-extension"
import { HotelRoomEntity } from "../../modules/hotel/entities"

export default setSeederFactory(HotelRoomEntity, (faker) => {
    const room = new HotelRoomEntity();
    room.title = faker.number.int({ min: 1, max: 356}).toString()
    room.description = faker.lorem.text()
    room.createdAt = new Date()
    room.updatedAt = new Date()

    return room;
})