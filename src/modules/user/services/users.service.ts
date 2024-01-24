import { IUser } from "../interfaces"
import { UserEntity } from "../entities"
import { Repository, ILike } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Injectable, NotFoundException } from "@nestjs/common"

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async get(id: string, required = true) {
        const user = await this.userRepository.findOneBy({ id });

        if (required && !user) {
            throw new NotFoundException(`There isn't any user with id: ${id}`);
        }

        return user;
    }

    async findOrCreateUser(input: Partial<IUser>): Promise<IUser> {
        const user = await this.userRepository
            .createQueryBuilder('users')
            .where('users.email = :email', { email: input?.email })
            .orWhere('users.phone = :phone', { phone: input.phone })
            .getOne();

        if (user) return user

        return this.createUser(input);
    }

    async createUser(input: Partial<IUser>): Promise<IUser> {
        return this.userRepository.save(input);
    }
}
