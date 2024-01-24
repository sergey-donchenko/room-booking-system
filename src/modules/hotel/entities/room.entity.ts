import { ApiProperty } from "@nestjs/swagger"
import { IHotel, IHotelRoom } from "../interfaces"
import { Exclude, Expose } from "class-transformer"
import { ESystemStatus } from "../../../common/enum/status.enum"

import {
    Entity,
    Column,
    OneToOne,
    JoinTable,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn, OneToMany,
} from "typeorm"

import {
    GROUP_HOTEL_ROOM,
    GROUP_ALL_HOTEL_ROOMS
} from "../constants"
import {IReservation} from "../../reservation/interfaces/reservation.interface";

@Entity({ name: 'hotel_rooms' })
export class HotelRoomEntity implements IHotelRoom {
    @ApiProperty({
        example: 'e53d8bb0-6728-4e04-9a8e-fc6a20eb9acc',
        description: 'The room\'s identifier',
    })
    @PrimaryGeneratedColumn('uuid')
    @Expose({
        groups: [
            GROUP_HOTEL_ROOM,
            GROUP_ALL_HOTEL_ROOMS
        ]
    })
    id: string;

    @Column({ nullable: false })
    @ApiProperty({
        example: 'H342-A',
        description: 'The number of the hotel\'s room',
    })
    @Expose({
        groups: [
            GROUP_HOTEL_ROOM,
            GROUP_ALL_HOTEL_ROOMS
        ]
    })
    title: string;

    @Column({ type: 'text', nullable: true })
    @ApiProperty({
        example: 'Big and clear',
        description: 'The description of the hotel\'s room',
    })
    @Expose({
        groups: [
            GROUP_HOTEL_ROOM,
            GROUP_ALL_HOTEL_ROOMS
        ]
    })
    description: null | string;

    @Column({
        nullable: true,
        default: ESystemStatus.ENABLED
    })
    @Exclude()
    status: number;

    @ManyToOne('HotelEntity', 'hotels')
    hotel: IHotel;

    @OneToMany('ReservationEntity', 'reservations')
    reservations: IReservation[];

    @CreateDateColumn()
    @Expose({
        groups: [
            GROUP_HOTEL_ROOM,
            GROUP_ALL_HOTEL_ROOMS
        ]
    })
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    @Expose({
        groups: [
            GROUP_HOTEL_ROOM,
            GROUP_ALL_HOTEL_ROOMS
        ]
    })
    updatedAt: Date;
}