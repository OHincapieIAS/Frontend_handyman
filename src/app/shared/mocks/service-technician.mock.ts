import { ServiceTechnicianModel } from "../models/service-technician.model";
import { serviceMock } from "./service.mock";
import { technicianMock } from "./technician.mock";

const startDate = new Date();
startDate.setDate(startDate.getDate()-4);
const finalDate = new Date();
finalDate.setDate(finalDate.getDate()-2);

export const serviceTechnicianMock: ServiceTechnicianModel = {
  idService: serviceMock.id,
  idTechnician: technicianMock.id,
  startDate,
  finalDate
}

export const serviceTechnicianEmptyFormValueMock = {
    idService: null,
    technicianDocument: {
      type: 'CC',
      number: null
    },
    idTechnician: null,
    startDate: null,
    finalDate: null
}

export const serviceTechnicianValidFormValueMock = {
    idService: serviceMock.id,
    technicianDocument: {
      type: 'CC',
      number: technicianMock.documentNumber
    },
    idTechnician: technicianMock.id,
    startDate,
    finalDate
}