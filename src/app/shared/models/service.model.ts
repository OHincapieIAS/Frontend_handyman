export interface ServiceModel {
    id: bigint;
    type: string;
    address: string;
    time: string;
    userId: bigint;
}

export interface ServiceTypeModel {
    id: number;
    name: string;
}

export interface ServiceTimeModel {
    id: number;
    title: string;
}