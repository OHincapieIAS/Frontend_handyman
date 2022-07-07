export interface ServiceTechnicianModel {
    idService: bigint;
    idTechnician: bigint;
    startDate: Date;
    finalDate: Date;
}

export interface ServiceTechnicianModelToCalculate {
    idTechnician: bigint;
    startDate: Date;
    finalDate: Date;
}
  
export interface ServiceTechnicianResponse extends ServiceTechnicianModel {
    status: string;
}