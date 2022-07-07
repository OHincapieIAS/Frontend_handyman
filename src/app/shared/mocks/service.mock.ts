import { ServiceModel } from "../models/service.model";

export const serviceMock: ServiceModel = {
    id: 1n,
    type: 'Instalación',
    address: 'Calle 100',
    time: 'Mañana',
    userId: 1n
};

export const servicesMock: ServiceModel[] = [
    {...serviceMock},
    {
        id: 2n,
        type: 'Instalación',
        address: 'Calle 20',
        time: 'Tarde',
        userId: 2n
    },
    {
        id: 3n,
        type: 'Reparación',
        address: 'Calle 40',
        time: 'Mañana',
        userId: 3n
    },
    {
        id: 4n,
        type: 'Reparación',
        address: 'Calle 15',
        time: 'Tarde',
        userId: 4n
    },
    {
        id: 5n,
        type: 'Instalación',
        address: 'Calle 48',
        time: 'Mañana',
        userId: 4n
    }
];