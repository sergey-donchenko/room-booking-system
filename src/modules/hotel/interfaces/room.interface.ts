import {ESystemStatus} from "../../../common/enum/status.enum";
import {IFindOptions} from "../../../common/interfaces/query.interface";

export interface IHotelRoom {
    id: string;
    title: string;
    description?: string;
    hotel?: any;
    status: ESystemStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface IFindHotelRoomOptions extends IFindOptions {
    startDate?: Date
    endDate?: Date
}

