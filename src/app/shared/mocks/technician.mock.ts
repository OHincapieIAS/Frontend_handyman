import { TechnicianModel } from "../models/technician.model";

export const technicianMock: TechnicianModel = {
    id: 1n,
    documentType: "CC",
    documentNumber: "12345",
    firstName: "Carlos Eduardo",
    lastName: "Rodriguez Ramirez"
};

export const techniciansMock: TechnicianModel[] = [
    {...technicianMock},
    {
        id: 2n,
        documentType: "CE",
        documentNumber: "87654",
        firstName: "Maria Camila",
        lastName: "Castillo Lopez"
    },
    {
        id: 3n,
        documentType: "CC",
        documentNumber: "54654",
        firstName: "Luis Jose",
        lastName: "Romero Villa"
    }
]