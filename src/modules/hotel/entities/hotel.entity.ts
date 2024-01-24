import { ApiProperty } from "@nestjs/swagger"
import { IHotel, IHotelRoom } from "../interfaces"
import { Exclude, Expose } from "class-transformer"
import { GROUP_ALL_HOTELS, GROUP_HOTEL } from "../constants"
import { ESystemStatus } from "../../../common/enum/status.enum"

import {
    Entity,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm"

@Entity({ name: 'hotels' })
export class HotelEntity implements IHotel {
    @ApiProperty({
        example: 'e53d8bb0-6728-4e04-9a8e-fc6a20eb9acc',
        description: 'The hotel identifier',
    })
    @PrimaryGeneratedColumn('uuid')
    @Expose({
        groups: [
            GROUP_HOTEL,
            GROUP_ALL_HOTELS
        ]
    })
    id: string;

    @Column({ nullable: false })
    @ApiProperty({
        example: 'Grand Palace',
        description: 'The title of the hotel',
    })
    @Expose({
        groups: [
            GROUP_HOTEL,
            GROUP_ALL_HOTELS
        ]
    })
    title: string;

    @Column({ type: 'text', nullable: true })
    @ApiProperty({
        example: 'John Deer',
        description: 'The description of the hotel',
    })
    @Expose({
        groups: [
            GROUP_HOTEL,
            GROUP_ALL_HOTELS
        ]
    })
    description: null | string;

    @Column({ nullable: true, default: 3 })
    @ApiProperty({
        example: '5',
        description: 'The hotel\'s star.',
    })
    @Expose({
        groups: [
            GROUP_HOTEL,
            GROUP_ALL_HOTELS
        ]
    })
    stars: number;

    @Column({nullable: true, default: null})
    @ApiProperty({
        example: 'Cooper Square, New York, NY 10003, USA',
        description: 'Address of the hotel',
    })
    @Expose({
        groups: [GROUP_HOTEL]
    })
    address: null | string;

    @Column({nullable: true, default: ESystemStatus.ENABLED})
    @Exclude()
    status: number;

    @OneToMany('HotelRoomEntity', 'room')
    rooms: IHotelRoom[];

    @CreateDateColumn()
    @Expose({
        groups: [
            GROUP_HOTEL,
            GROUP_ALL_HOTELS
        ]
    })
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    @Expose({
        groups: [
            GROUP_HOTEL,
            GROUP_ALL_HOTELS
        ]
    })
    updatedAt: Date;
}