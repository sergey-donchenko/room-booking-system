import {ESystemStatus} from "../../../common/enum/status.enum";

export interface IHotelRoom {
    id: string;
    title: string;
    description?: string;
    hotel?: any;
    status: ESystemStatus;
    createdAt: Date;
    updatedAt: Date;
}

