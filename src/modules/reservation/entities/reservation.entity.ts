import { ApiProperty } from "@nestjs/swagger"
import { Exclude, Expose } from "class-transformer"
import { EReservationStatus } from "../enum/reservation.enum"
import { IUser } from "../../user/interfaces"
import { IHotelRoom } from "../../hotel/interfaces";
import { IReservation } from "../interfaces"

import {
    Entity,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn, Index,
} from "typeorm"

import {
    GROUP_RESERVATION,
    GROUP_ALL_RESERVATIONS
} from "../reservation.constants";

@Entity({ name: 'reservations' })
@Index('Reservation_By_Room_And_Status',[
    'room',
    'status',
    'startDate'
])
export class ReservationEntity implements IReservation {
    @ApiProperty({
        example: 'e53d8bb0-6728-4e04-9a8e-fc6a20eb9acc',
        description: 'The reservation identifier',
    })
    @PrimaryGeneratedColumn('uuid')
    @Expose({
        groups: [
            GROUP_RESERVATION,
            GROUP_ALL_RESERVATIONS
        ]
    })
    id: string;

    @Column({ nullable: false })
    @ApiProperty({
        example: 'not windy side',
        description: 'The reservation comment',
    })
    @Expose({
        groups: [
            GROUP_RESERVATION,
            GROUP_ALL_RESERVATIONS
        ]
    })
    comment: string;

    @Expose({
        groups: [
            GROUP_RESERVATION,
            GROUP_ALL_RESERVATIONS
        ],
    })
    @CreateDateColumn({ nullable: false })
    startDate: Date;

    @Expose({
        groups: [
            GROUP_RESERVATION,
            GROUP_ALL_RESERVATIONS
        ],
    })
    @CreateDateColumn({ nullable: false })
    endDate: Date;

    @Column({nullable: true, default: EReservationStatus.ACTIVE})
    @Exclude()
    status: number;

    @ManyToOne('HotelRoomEntity', 'room')
    room: IHotelRoom;

    @ManyToOne('UserEntity', 'user')
    user: IUser;

    @CreateDateColumn()
    @Expose({
        groups: [
            GROUP_RESERVATION,
            GROUP_ALL_RESERVATIONS
        ]
    })
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    @Expose({groups: [
            GROUP_RESERVATION,
            GROUP_ALL_RESERVATIONS
        ]})
    updatedAt: Date;
}