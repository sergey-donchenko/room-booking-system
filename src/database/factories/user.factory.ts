import { setSeederFactory } from "typeorm-extension"
import {UserEntity} from "../../modules/user/entities"

export default setSeederFactory(UserEntity, (faker) => {
    const user = new UserEntity();

    user.address = faker.location.streetAddress({ useFullAddress: true });
    user.fullname = faker.person.fullName()
    user.phone = faker.phone.number()
    user.email = faker.internet.email()
    user.createdAt = new Date()
    user.updatedAt = new Date()

    return user;
})