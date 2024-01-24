import {DataSource} from "typeorm"
import {Seeder} from "typeorm-extension"
import {SeederFactoryManager} from "typeorm-extension/dist/seeder/factory"
import {UserEntity} from "../../modules/user/entities";

export default class CreateDummyUsersSeed implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userFactory = await factoryManager.get(UserEntity);

        // Create users
        await userFactory.saveMany(5);
    }
}