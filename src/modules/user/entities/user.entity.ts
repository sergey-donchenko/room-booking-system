import { ApiProperty } from "@nestjs/swagger"
import { EUserStatus, IUser } from "../interfaces"
import { Exclude, Expose } from "class-transformer"
import { IReservation } from "../../reservation/interfaces/reservation.interface"

import {
    GROUP_USER,
    GROUP_ALL_USERS
} from "../user.constant"

import {
    Column,
    Entity,
    OneToMany,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn
} from "typeorm"

@Entity({ name: 'users' })
export class UserEntity implements IUser {
    @ApiProperty({
        example: 'e53d8bb0-6728-4e04-9a8e-fc6a20eb9acc',
        description: 'The user identifier',
    })
    @PrimaryGeneratedColumn('uuid')
    @Expose({groups: [GROUP_USER, GROUP_ALL_USERS]})
    id: string;

    @Column()
    @ApiProperty({
        example: 'example@example.com',
        description: 'The email of the user',
    })
    @Expose({groups: [GROUP_USER, GROUP_ALL_USERS]})
    email: string;

    @Column({nullable: true, default: null})
    @ApiProperty({
        example: 'John Deer',
        description: 'The full name of the user',
    })
    @Expose({groups: [GROUP_USER, GROUP_ALL_USERS]})
    fullname: null | string;

    @Column({nullable: true, default: null})
    @ApiProperty({
        example: 'Cooper Square, New York, NY 10003, USA',
        description: 'Address of the user',
    })
    @Expose({groups: [GROUP_USER]})
    address: null | string;

    @Column({nullable: true, default: null})
    @Expose({groups: [GROUP_USER]})
    phone: null | string;

    @Column({nullable: true, default: EUserStatus.DISABLED})
    @Exclude()
    status: null | number;

    @OneToMany('ReservationEntity', 'reservations')
    reservations: IReservation[];

    @CreateDateColumn()
    @Expose({groups: [GROUP_USER, GROUP_ALL_USERS]})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    @Expose({groups: [GROUP_USER, GROUP_ALL_USERS]})
    updatedAt: Date;
}