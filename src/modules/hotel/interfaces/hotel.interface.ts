import {ESystemStatus} from "../../../common/enum/status.enum";

export interface IHotel {
    id: string;
    title: string;
    stars?: number;
    description?: string;
    address?: string;
    status: ESystemStatus;
    createdAt: Date;
    updatedAt: Date;
}

