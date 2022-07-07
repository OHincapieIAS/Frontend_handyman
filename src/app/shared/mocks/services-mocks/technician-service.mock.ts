import { of } from "rxjs"
import { technicianMock, techniciansMock } from "../technician.mock"

export class TechnicianServiceMock {
    currentTechnicianValue = () => technicianMock;
    queryByDocument = () => {}
    validateTechnicianByDocument = (type: string, number: string) => of(techniciansMock.some(t => t.documentType === type && t.documentNumber === number));
}