export enum EUserStatus {
    ENABLED = 1,
    DISABLED = 0,
}

export interface IUser {
    id: string;
    email: string;
    fullname: null | string;
    phone: null | string;
    address: null | string;
    status: EUserStatus;
    createdAt: Date;
    updatedAt: Date;
}

