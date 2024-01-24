import { setSeederFactory } from "typeorm-extension"
import { HotelEntity } from "../../modules/hotel/entities"

export default setSeederFactory(HotelEntity, (faker) => {
    const hotel = new HotelEntity();
    hotel.address = faker.location.streetAddress({ useFullAddress: true });
    hotel.description = faker.lorem.text()
    hotel.createdAt = new Date()
    hotel.updatedAt = new Date()
    hotel.stars = faker.number.int({ min: 1, max: 5})
    hotel.title = faker.lorem.lines()

    return hotel;
})